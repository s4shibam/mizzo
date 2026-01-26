import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Status } from '@mizzo/prisma'

import { env } from '@/constants/env'

import { createTrackStatusNotification } from '../../services/notification'
import { startTrackLiveLyricWorkflow } from '../../services/temporal'
import { throwError } from '../../utils/throw-error'

export const updateTrackStatus = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackStatusReqQParams.parse(req.params)
  const { status } = zUpdateTrackStatusReqBody.parse(req.body)

  const track = await prisma.track.update({
    where: { id: trackId },
    data: { status },
    select: {
      title: true,
      primaryArtistId: true,
      trackKey: true,
      duration: true,
      language: true
    }
  })

  createTrackStatusNotification({
    userId: track.primaryArtistId,
    trackTitle: track.title,
    status
  })

  if (status === Status.REVIEWING) {
    if (!track.trackKey) {
      throwError('Track audio key not found', 400)
    }

    if (!track.duration) {
      throwError('Track duration not found', 400)
    }

    const workflowId = `track-live-lyric-${trackId}`
    let wasWorkflowStarted = false

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
        console.error('Error starting track live lyric workflow:', error)
      }
    }

    await prisma.trackLiveLyric.upsert({
      where: { trackId },
      update: {
        status: 'PENDING',
        workflowId: wasWorkflowStarted ? workflowId : undefined,
        errorMessage: env.enableTemporal
          ? undefined
          : 'Temporal feature is disabled',
        content: undefined
      },
      create: {
        trackId,
        status: 'PENDING',
        workflowId: wasWorkflowStarted ? workflowId : undefined,
        errorMessage: env.enableTemporal
          ? undefined
          : 'Temporal feature is disabled'
      }
    })
  }

  res.status(200).json({ message: 'Success' })
}

const zUpdateTrackStatusReqQParams = z.object({
  trackId: z.string()
})

const zUpdateTrackStatusReqBody = z.object({
  status: z.enum(Status, {
    message: 'Invalid status value'
  })
})
