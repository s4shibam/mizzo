import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const toggleLikeOfTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zToggleLikeOfTrackReqParams.parse(req.params)

  const track = await prisma.track.findUnique({
    where: {
      id: trackId,
      isPublic: true
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

  if (track.status !== 'PUBLISHED') {
    throwError('You cannot like a track that is not published', 400)
  }

  const likedTrack = await prisma.likedTrack.findUnique({
    where: {
      userId_trackId: {
        userId,
        trackId
      }
    }
  })

  await prisma.$transaction(async (tx) => {
    if (likedTrack) {
      await tx.likedTrack.delete({
        where: {
          userId_trackId: {
            userId,
            trackId
          }
        }
      })
    } else {
      await tx.likedTrack.create({
        data: {
          userId,
          trackId
        }
      })
    }

    await tx.track.update({
      where: {
        id: trackId
      },
      data: {
        likes: {
          increment: likedTrack ? -1 : 1
        }
      }
    })
  })

  if (!likedTrack) {
    res.status(200).json({
      message: 'Added to liked tracks'
    })
  } else {
    res.status(200).json({
      message: 'Removed from liked tracks'
    })
  }
}

const zToggleLikeOfTrackReqParams = z.object({
  trackId: z.string().cuid2()
})
