import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const getTopTracks = async (req: Request, res: Response) => {
  const { limit } = zGetTopTracksReqQuery.parse(req.query)

  const cacheKey = getCacheKey(req)

  const cachedTopTracks = await cache.get(cacheKey)

  if (cachedTopTracks) {
    return res.status(200).json({
      message: 'Top tracks found',
      data: cachedTopTracks
    })
  }

  const fetchLimit = Math.min(limit * 3, 30)

  const tracks = await prisma.track.findMany({
    where: {
      status: 'PUBLISHED',
      isPublic: true
    },
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: [{ listens: 'desc' }, { likes: 'desc' }],
    take: fetchLimit
  })

  if (tracks.length === 0) {
    throwError('No tracks found', 404)
  }

  const shuffledTracks = tracks.sort(() => Math.random() - 0.5)

  const limitedTracks = shuffledTracks.slice(0, limit)

  const response = {
    heading: 'Top Tracks',
    tracks: limitedTracks
  }

  await cache.set({
    key: cacheKey,
    value: response,
    options: {
      ttl: 1 * 60 * 60
    }
  })

  res.status(200).json({
    message: 'Top tracks found',
    data: response
  })
}

const zGetTopTracksReqQuery = z.object({
  limit: z.coerce.number().min(1).max(20).default(8)
})
