import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'

export const getLikeStatusOfPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { playlistId } = zGetLikeStatusOfPlaylistReqParams.parse(req.params)

  const cacheKey = getCacheKey(req)

  const cachedStatus = await cache.get<{ isLiked: boolean }>(cacheKey)

  if (cachedStatus !== null) {
    return res.status(200).json({
      message: cachedStatus.isLiked
        ? 'Playlist is liked'
        : 'Playlist is not liked',
      data: cachedStatus
    })
  }

  const likedPlaylist = await prisma.likedPlaylist.findUnique({
    where: {
      userId_playlistId: {
        userId,
        playlistId
      }
    }
  })

  const response = { isLiked: !!likedPlaylist }

  await cache.set({
    key: cacheKey,
    value: response,
    options: {
      ttl: 5 * 60
    }
  })

  if (likedPlaylist) {
    res.status(200).json({
      message: 'Playlist is liked',
      data: response
    })
  } else {
    res.status(200).json({
      message: 'Playlist is not liked',
      data: response
    })
  }
}

const zGetLikeStatusOfPlaylistReqParams = z.object({
  playlistId: z.string().cuid2()
})
