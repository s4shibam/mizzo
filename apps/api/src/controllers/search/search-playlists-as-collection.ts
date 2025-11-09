import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { playlistCollectionMap } from '../../constants/playlist-collection'
import { throwError } from '../../utils/throw-error'

export const searchPlaylistsAsCollection = async (
  req: Request,
  res: Response
) => {
  const { search: slug } = zSearchPlaylistsAsCollectionReqParams.parse(
    req.params
  )

  const { limit } = zSearchPlaylistsAsCollectionReqQuery.parse(req.query)

  const playlistCollection = playlistCollectionMap[slug]

  if (!playlistCollection) {
    throwError('Playlist collection not found', 404)
  }

  const playlists = await prisma.playlist.findMany({
    where: {
      id: {
        in: playlistCollection.playlist_ids
      }
    },
    select: {
      id: true,
      name: true,
      description: true,
      posterKey: true,
      owner: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  const shuffledPlaylists = playlists.sort(() => Math.random() - 0.5)

  res.status(200).json({
    message: 'Playlist(s) found',
    data: {
      ...playlistCollection,
      playlists: shuffledPlaylists.slice(0, parseInt(limit))
    }
  })
}

const zSearchPlaylistsAsCollectionReqParams = z.object({
  search: z.string()
})

const zSearchPlaylistsAsCollectionReqQuery = z.object({
  limit: z.string().optional().default('8')
})
