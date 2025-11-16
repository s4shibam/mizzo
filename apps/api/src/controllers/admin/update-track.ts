import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Status, type Prisma } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { createTrackStatusNotification } from '../../services/notification'
import { throwError } from '../../utils/throw-error'

export const updateTrack = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackParams.parse(req.params)
  const { status } = zUpdateTrackReqBody.parse(req.body)

  const data: Prisma.TrackUpdateInput = {
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

  if (status) {
    createTrackStatusNotification({
      userId: track.primaryArtistId,
      trackTitle: track.title,
      status
    })
  }

  res.status(200).json({ message: 'Track updated successfully' })
}

const zUpdateTrackParams = z.object({
  trackId: z.string().cuid2()
})

const zUpdateTrackReqBody = z.object({
  status: z.enum(STATUS_LIST as [Status, ...Status[]]).optional()
})
