import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { getFullTextSearchQuery } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchPlaylistsByPlaylistName = async (
  req: Request,
  res: Response
) => {
  const { search } = zSearchPlaylistsByPlaylistNameReqParams.parse(req.params)

  const ftsQuery = getFullTextSearchQuery(search)

  const playlists = await prisma.playlist.findMany({
    where: {
      isPublic: true,
      status: 'PUBLISHED',
      OR: [
        {
          name: { contains: ftsQuery, mode: 'insensitive' }
        },
        {
          description: { contains: ftsQuery, mode: 'insensitive' }
        },
        {
          owner: {
            name: { contains: ftsQuery, mode: 'insensitive' }
          }
        }
      ]
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true
        }
      }
    },
    take: 10
  })

  if (playlists?.length === 0) {
    throwError('No Playlist found', 404)
  }

  res.status(200).json({
    message: `Search result for "${search}"`,
    data: playlists
  })
}

const zSearchPlaylistsByPlaylistNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})
