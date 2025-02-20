import { Request, Response } from 'express'

import { z } from 'zod'

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

  res.status(200).json({
    message: 'Playlist(s) found',
    data: {
      ...playlistCollection,
      playlists: playlistCollection.playlists.slice(0, parseInt(limit))
    }
  })
}

const zSearchPlaylistsAsCollectionReqParams = z.object({
  search: z.string()
})

const zSearchPlaylistsAsCollectionReqQuery = z.object({
  limit: z.string().optional().default('8')
})
