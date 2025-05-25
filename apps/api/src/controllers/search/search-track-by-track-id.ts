import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchTrackByTrackId = async (req: Request, res: Response) => {
  const userId = req.user?.id
  const { trackId } = zSearchTrackByTrackIdReqParams.parse(req.params)
  const { as } = zSearchTrackByTrackIdReqQuery.parse(req.query)

  const cacheKey = getCacheKey(req)

  const cachedTrack = await cache.get(cacheKey)

  if (cachedTrack) {
    return res.status(200).json({
      message: 'Track found',
      data: cachedTrack
    })
  }

  const options: Prisma.TrackWhereUniqueInput = {
    id: undefined
  }

  if (as && as === 'admin') {
    options.id = trackId
  } else if (as && as === 'artist') {
    options.id_primaryArtistId = {
      id: trackId,
      primaryArtistId: userId
    }
  } else if (as && as === 'user') {
    options.id = trackId
    options.isPublic = true
    options.status = 'PUBLISHED'
  }

  const track = await prisma.track.findUnique({
    where: { ...options },
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

  await cache.set({
    key: cacheKey,
    value: track,
    options: {
      ttl: 1 * 60 * 60
    }
  })

  res.status(200).json({
    message: 'Track found',
    data: track
  })
}

const zSearchTrackByTrackIdReqParams = z.object({
  trackId: z.string().cuid2()
})

const zSearchTrackByTrackIdReqQuery = z.object({
  as: z.enum(['admin', 'artist', 'user']).optional().default('user')
})
