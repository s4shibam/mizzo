import { Request, Response } from 'express'

import { z } from 'zod'

import { Prisma, prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchPlaylistByPlaylistId = async (
  req: Request,
  res: Response
) => {
  const options: Prisma.PlaylistWhereUniqueInput = {
    id: undefined
  }
  const userId = req.user?.id
  const { playlistId } = zSearchPlaylistByPlaylistIdReqParams.parse(req.params)
  const { as } = zSearchPlaylistByPlaylistIdReqQuery.parse(req.query)

  const cacheKey = getCacheKey(req)

  const cachedPlaylist = await cache.get(cacheKey)

  if (cachedPlaylist) {
    return res.status(200).json({
      message: 'Playlist found',
      data: cachedPlaylist
    })
  }

  if (as && as === 'admin') {
    options.id = playlistId
  } else if (as && as === 'owner') {
    options.id_ownerId = {
      id: playlistId,
      ownerId: userId
    }
  } else if (as && as === 'user') {
    options.id = playlistId
    options.isPublic = true
    options.status = 'PUBLISHED'
  }

  const playlist = await prisma.playlist.findUnique({
    where: {
      ...options
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          isArtist: true
        }
      },
      playlistTracks: {
        where: {
          track: {
            status: 'PUBLISHED',
            isPublic: true
          }
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
      }
    }
  })

  if (!playlist) {
    throwError('Playlist not found', 404)
  }

  const playlistTracks = playlist.playlistTracks.map(({ track }) => track)
  const playlistData = {
    ...playlist,
    playlistTracks
  }

  await cache.set({
    key: cacheKey,
    value: playlistData,
    options: {
      ttl: 30 * 60
    }
  })

  res.status(200).json({
    message: 'Playlist found',
    data: playlistData
  })
}

const zSearchPlaylistByPlaylistIdReqParams = z.object({
  playlistId: z.string()
})

const zSearchPlaylistByPlaylistIdReqQuery = z.object({
  as: z.enum(['admin', 'owner', 'user']).optional().default('user')
})
