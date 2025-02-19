import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

export const getLikeStatusOfTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zGetLikeStatusOfTrackReqParams.parse(req.params)

  const likedTrack = await prisma.likedTrack.findUnique({
    where: {
      userId_trackId: {
        userId,
        trackId
      }
    }
  })

  if (likedTrack) {
    res.status(200).json({
      message: 'Track is liked',
      data: { isLiked: true }
    })
  } else {
    res.status(200).json({
      message: 'Track is not liked',
      data: { isLiked: false }
    })
  }
}

const zGetLikeStatusOfTrackReqParams = z.object({
  trackId: z.string().cuid2()
})
