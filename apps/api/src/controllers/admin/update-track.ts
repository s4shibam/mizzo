import { Request, Response } from 'express'

import { z } from 'zod'

import {
  env as awsEnv,
  sqsBuildS3EventBridgeMessage,
  sqsSendMessage
} from '@mizzo/aws'
import {
  prisma,
  Status,
  TrackLiveLyricStatus,
  type Prisma
} from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { env } from '../../constants/env'
import { createTrackStatusNotification } from '../../services/notification'
import { startTrackLiveLyricWorkflow } from '../../services/temporal'
import { getStatusText } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const updateTrack = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackParams.parse(req.params)
  const { status, liveLyricStatus } = zUpdateTrackReqBody.parse(req.body)

  if (!status && !liveLyricStatus) {
    throwError('No updates provided', 400)
  }

  const data: Prisma.TrackUpdateInput = {}

  if (status) {
    data.status = status
    data.isPublic = status === 'PUBLISHED'
  }

  const track = await prisma.track.findUnique({
    where: {
      id: trackId
    },
    select: {
      title: true,
      primaryArtistId: true,
      trackKey: true,
      duration: true,
      language: true
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

  if (status) {
    await prisma.track.update({
      where: {
        id: trackId
      },
      data
    })

    createTrackStatusNotification({
      userId: track.primaryArtistId,
      trackTitle: track.title,
      status
    })
  }

  // If status is set to PENDING, send message to SQS to reprocess the track
  let responseStatus = 200
  const responseMessages: string[] = []

  if (status === 'PENDING' && track.trackKey) {
    const s3EventBridgeMessage = sqsBuildS3EventBridgeMessage({
      bucketName: awsEnv.awsS3Bucket,
      key: track.trackKey
    })

    const messageSent = await sqsSendMessage(s3EventBridgeMessage)

    if (messageSent) {
      responseStatus = 201
      responseMessages.push(
        `Track status updated to ${getStatusText({ status })} and queued for reprocessing.`
      )
    } else {
      responseStatus = 201
      responseMessages.push(
        `Track status updated to ${getStatusText({ status })}, but failed to queue for reprocessing.`
      )
    }
  } else if (status) {
    responseMessages.push('Track updated successfully')
  }

  if (liveLyricStatus) {
    let workflowId: string | undefined
    let wasWorkflowStarted = false
    let workflowErrorMessage: string | undefined

    if (liveLyricStatus === 'PENDING') {
      if (!track.trackKey) {
        throwError('Track audio key not found', 400)
      }

      if (!track.duration) {
        throwError('Track duration not found', 400)
      }

      workflowId = `track-live-lyric-${trackId}`

      if (env.enableTemporal) {
        try {
          await startTrackLiveLyricWorkflow(
            {
              trackId,
              audioS3Key: track.trackKey,
              duration: track.duration,
              title: track.title,
              language: track.language
            },
            workflowId
          )

          wasWorkflowStarted = true
        } catch (error) {
          workflowErrorMessage =
            error instanceof Error
              ? error.message
              : JSON.stringify(error) || 'Failed to start workflow'
          console.error('Error starting track live lyric workflow:', error)
        }
      }
    }

    await prisma.trackLiveLyric.upsert({
      where: { trackId },
      update: {
        status: liveLyricStatus,
        workflowId:
          liveLyricStatus === 'PENDING' && wasWorkflowStarted
            ? workflowId
            : undefined,
        errorMessage:
          liveLyricStatus === 'PENDING'
            ? !env.enableTemporal
              ? 'Temporal feature is disabled'
              : workflowErrorMessage
            : undefined
      },
      create: {
        trackId,
        status: liveLyricStatus,
        workflowId:
          liveLyricStatus === 'PENDING' && wasWorkflowStarted
            ? workflowId
            : undefined,
        errorMessage:
          liveLyricStatus === 'PENDING'
            ? !env.enableTemporal
              ? 'Temporal feature is disabled'
              : workflowErrorMessage
            : undefined
      }
    })

    if (liveLyricStatus === 'PENDING') {
      responseStatus = 201
      responseMessages.push(
        wasWorkflowStarted
          ? 'Lyrics status set to Pending and workflow started.'
          : 'Lyrics status set to Pending, but failed to start workflow.'
      )
    } else {
      responseMessages.push(
        `Lyrics status updated to ${getLiveLyricStatusText(liveLyricStatus)}.`
      )
    }
  }

  res.status(responseStatus).json({
    message: responseMessages.length
      ? responseMessages.join(' ')
      : 'Track updated successfully'
  })
}

const zUpdateTrackParams = z.object({
  trackId: z.string().cuid2()
})

const zUpdateTrackReqBody = z.object({
  status: z.enum(STATUS_LIST as [Status, ...Status[]]).optional(),
  liveLyricStatus: z.nativeEnum(TrackLiveLyricStatus).optional()
})

const getLiveLyricStatusText = (status: TrackLiveLyricStatus) =>
  status.slice(0, 1) + status.slice(1).toLowerCase()
