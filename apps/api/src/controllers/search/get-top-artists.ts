import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const getTopArtists = async (req: Request, res: Response) => {
  const { limit } = zGetTopArtistsReqQuery.parse(req.query)

  const cacheKey = getCacheKey(req)

  const cachedTopArtists = await cache.get(cacheKey)

  if (cachedTopArtists) {
    return res.status(200).json({
      message: 'Top artists found',
      data: cachedTopArtists
    })
  }

  const fetchLimit = Math.min(limit * 3, 30)

  const topArtistsByListens = await prisma.track.groupBy({
    by: ['primaryArtistId'],
    where: {
      status: 'PUBLISHED',
      isPublic: true
    },
    _sum: {
      listens: true
    },
    _count: {
      id: true
    },
    orderBy: {
      _sum: {
        listens: 'desc'
      }
    },
    take: fetchLimit
  })

  if (topArtistsByListens.length === 0) {
    throwError('No artists found', 404)
  }

  const artistIds = topArtistsByListens.map((item) => item.primaryArtistId)

  const artists = await prisma.user.findMany({
    where: {
      id: {
        in: artistIds
      },
      isArtist: true,
      isPublicProfile: true
    },
    include: {
      profile: {
        select: {
          avatarKey: true,
          bio: true
        }
      }
    }
  })

  const artistMap = new Map(artists.map((artist) => [artist.id, artist]))

  const artistsWithStats = topArtistsByListens
    .map((item) => {
      const artist = artistMap.get(item.primaryArtistId)
      if (!artist) return null

      return {
        ...artist,
        totalListens: item._sum.listens ?? 0,
        trackCount: item._count.id
      }
    })
    .filter((item) => item !== null)

  if (artistsWithStats.length === 0) {
    throwError('No artists found', 404)
  }

  const shuffledArtists = artistsWithStats.sort(() => Math.random() - 0.5)

  const limitedArtists = shuffledArtists.slice(0, limit)

  const response = {
    heading: 'Top Artists',
    artists: limitedArtists
  }

  await cache.set({
    key: cacheKey,
    value: response,
    options: {
      ttl: 2 * 60 * 60
    }
  })

  res.status(200).json({
    message: 'Top artists found',
    data: response
  })
}

const zGetTopArtistsReqQuery = z.object({
  limit: z.coerce.number().min(1).max(20).default(8)
})
