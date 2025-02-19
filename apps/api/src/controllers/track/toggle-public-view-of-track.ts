import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const togglePublicViewOfTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zTogglePublicViewOfTrackReqParams.parse(req.params)

  const track = await prisma.track.findUnique({
    where: {
      id_primaryArtistId: {
        id: trackId,
        primaryArtistId: userId
      }
    }
  })

  if (!track) {
    throwError('Unauthorized access', 403)
  }

  const isPublicInitially = track.isPublic

  await prisma.$transaction(async (tx) => {
    await tx.likedTrack.deleteMany({
      where: {
        trackId
      }
    })

    await tx.track.update({
      where: {
        id: trackId
      },
      data: {
        isPublic: {
          set: !isPublicInitially
        },
        likes: {
          set: 0
        }
      }
    })
  })

  if (!isPublicInitially) {
    res.status(200).json({
      message: 'Your track is visible to all'
    })
  } else {
    res.status(200).json({
      message: 'Your track is hidden'
    })
  }
}

const zTogglePublicViewOfTrackReqParams = z.object({
  trackId: z.string().cuid2()
})
