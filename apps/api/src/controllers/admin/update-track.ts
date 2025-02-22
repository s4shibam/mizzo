import { Request, Response } from 'express'

import { Status } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

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
      primaryArtistId: true
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
