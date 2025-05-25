import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'

export const getLikeStatusOfTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zGetLikeStatusOfTrackReqParams.parse(req.params)

  const cacheKey = getCacheKey(req)

  const cachedStatus = await cache.get<{ isLiked: boolean }>(cacheKey)

  if (cachedStatus !== null) {
    return res.status(200).json({
      message: cachedStatus.isLiked ? 'Track is liked' : 'Track is not liked',
      data: cachedStatus
    })
  }

  const likedTrack = await prisma.likedTrack.findUnique({
    where: {
      userId_trackId: {
        userId,
        trackId
      }
    }
  })

  const response = { isLiked: !!likedTrack }

  await cache.set({
    key: cacheKey,
    value: response,
    options: {
      ttl: 5 * 60
    }
  })

  if (likedTrack) {
    res.status(200).json({
      message: 'Track is liked',
      data: response
    })
  } else {
    res.status(200).json({
      message: 'Track is not liked',
      data: response
    })
  }
}

const zGetLikeStatusOfTrackReqParams = z.object({
  trackId: z.string().cuid2()
})
