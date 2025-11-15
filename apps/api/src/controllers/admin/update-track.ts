import { Request, Response } from 'express'

import { z } from 'zod'

import {
  env as awsEnv,
  sqsBuildS3EventBridgeMessage,
  sqsSendMessage
} from '@mizzo/aws'
import { prisma, Status } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { createTrackStatusNotification } from '../../services/notification'
import { getStatusText } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const updateTrack = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackParams.parse(req.params)
  const { status } = zUpdateTrackReqBody.parse(req.body)

  const data: { status: Status; isPublic: boolean } = {
    status,
    isPublic: status === 'PUBLISHED'
  }

  const track = await prisma.track.findUnique({
    where: {
      id: trackId
    },
    select: {
      title: true,
      primaryArtistId: true,
      trackKey: true
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

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

  // If status is set to PENDING, send message to SQS to reprocess the track
  if (status === 'PENDING' && track.trackKey) {
    const s3EventBridgeMessage = sqsBuildS3EventBridgeMessage({
      bucketName: awsEnv.awsS3Bucket,
      key: track.trackKey
    })

    const messageSent = await sqsSendMessage(s3EventBridgeMessage)

    if (messageSent) {
      res.status(201).json({
        message: `Track status updated to ${getStatusText({ status })} and queued for reprocessing.`
      })
      return
    } else {
      res.status(201).json({
        message: `Track status updated to ${getStatusText({ status })}, but failed to queue for reprocessing.`
      })
      return
    }
  }

  res.status(201).json({
    message: `Track status updated to ${getStatusText({ status })}`
  })
}

const zUpdateTrackParams = z.object({
  trackId: z.string().cuid2()
})

const zUpdateTrackReqBody = z.object({
  status: z.enum(STATUS_LIST as [Status, ...Status[]])
})
