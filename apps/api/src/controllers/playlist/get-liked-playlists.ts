import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const getLikedPlaylists = async (req: Request, res: Response) => {
  const userId = req.user.id

  const cacheKey = getCacheKey(req)

  const cachedLikedPlaylists = await cache.get(cacheKey)

  if (cachedLikedPlaylists) {
    return res.status(200).json({
      message: 'Successfully fetched your liked playlists',
      data: cachedLikedPlaylists
    })
  }

  const likedPlaylists = await prisma.likedPlaylist.findMany({
    where: {
      userId
    },
    include: {
      playlist: {
        include: {
          owner: {
            select: {
              id: true,
              name: true
            }
          },
          _count: {
            select: {
              playlistTracks: true
            }
          }
        }
      }
    }
  })

  const publicLikedPlaylists = likedPlaylists.filter(
    (likedPlaylist) => likedPlaylist.playlist.isPublic
  )

  if (publicLikedPlaylists?.length === 0) {
    throwError('No playlist found', 404)
  }

  const formattedPublicLikedPlaylists = publicLikedPlaylists.map(
    (likedPlaylist) => {
      return {
        ...likedPlaylist.playlist
      }
    }
  )

  await cache.set({
    key: cacheKey,
    value: formattedPublicLikedPlaylists,
    options: {
      ttl: 30 * 60
    }
  })

  res.status(200).json({
    message: 'Successfully fetched your liked playlists',
    data: formattedPublicLikedPlaylists
  })
}
