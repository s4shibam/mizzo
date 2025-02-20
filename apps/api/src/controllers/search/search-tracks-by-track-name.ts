import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { getFullTextSearchQuery } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchTracksByTrackName = async (req: Request, res: Response) => {
  const { search } = zSearchTracksByTrackNameReqParams.parse(req.params)

  const ftsQuery = getFullTextSearchQuery(search)

  const tracks = await prisma.track.findMany({
    where: {
      isPublic: true,
      status: 'PUBLISHED',
      OR: [
        {
          title: { contains: ftsQuery, mode: 'insensitive' }
        },

        {
          language: { contains: ftsQuery, mode: 'insensitive' }
        },

        {
          tags: { contains: ftsQuery, mode: 'insensitive' }
        },

        {
          primaryArtist: {
            name: { contains: ftsQuery, mode: 'insensitive' }
          }
        },
        {
          secondaryArtists: {
            some: {
              name: { contains: ftsQuery, mode: 'insensitive' }
            }
          }
        }
      ]
    },
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      },
      secondaryArtists: {
        select: {
          id: true,
          name: true
        }
      }
    },
    take: 10
  })

  if (tracks?.length === 0) {
    throwError('No track found', 404)
  }

  res.status(200).json({
    message: `Search result for "${search}"`,
    data: tracks
  })
}

const zSearchTracksByTrackNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})
