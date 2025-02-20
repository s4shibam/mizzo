import { Request, Response } from 'express'

import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { getStaticPlaylist } from '../../constants/playlist-collection'
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

  if (playlistId.startsWith('mizzo-')) {
    const staticPlaylist = getStaticPlaylist(playlistId)

    if (!staticPlaylist) {
      throwError('Playlist not found', 404)
    }

    return res.status(200).json({
      message: 'Playlist found',
      data: staticPlaylist
    })
  }

  const playlist = await prisma.playlist.findUnique({
    where: {
      ...options
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true
        }
      },
      playlistTracks: {
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

  res.status(200).json({
    message: 'Playlist found',
    data: {
      ...playlist,
      playlistTracks
    }
  })
}

const zSearchPlaylistByPlaylistIdReqParams = z.object({
  playlistId: z.string()
})

const zSearchPlaylistByPlaylistIdReqQuery = z.object({
  as: z.enum(['admin', 'owner', 'user']).optional().default('user')
})
