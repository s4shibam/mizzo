import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'

export const getLikedTracks = async (req: Request, res: Response) => {
  const userId = req.user.id

  const cacheKey = getCacheKey(req)

  const cachedLikedTracks = await cache.get(cacheKey)

  if (cachedLikedTracks) {
    return res.status(200).json({
      message: 'Successfully fetched your liked tracks',
      data: cachedLikedTracks
    })
  }

  const likedTracks = await prisma.likedTrack.findMany({
    where: {
      userId
    },
    include: {
      track: {
        include: {
          primaryArtist: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })

  const publicLikedTracks = likedTracks.filter(
    (likedTrack) => likedTrack.track.isPublic
  )

  const formattedPublicLikedTracks = publicLikedTracks.map((likedTrack) => {
    return {
      ...likedTrack.track
    }
  })

  const response = {
    id: 'liked-songs',
    name: 'Liked Songs',
    playlistTracks: formattedPublicLikedTracks
  }

  await cache.set({
    key: cacheKey,
    value: response,
    options: {
      ttl: 30 * 60
    }
  })

  res.status(200).json({
    message: 'Successfully fetched your liked tracks',
    data: response
  })
}
