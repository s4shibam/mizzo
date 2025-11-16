import { Request, Response } from 'express'

import { z } from 'zod'

import { Prisma, prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

export const searchPlaylistsByPlaylistName = async (
  req: Request,
  res: Response
) => {
  const { search } = zSearchPlaylistsByPlaylistNameReqParams.parse(req.params)
  const { currentPage, perPage } = zSearchPlaylistsByPlaylistNameReqQuery.parse(
    req.query
  )

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Extract individual words for better search
  const searchWords = search.split(/\s+/).filter((word) => word.length > 2)

  // Exact phrase search conditions
  const exactConditions: Prisma.PlaylistWhereInput[] = [
    { name: { contains: search, mode: 'insensitive' } },
    { description: { contains: search, mode: 'insensitive' } },
    { owner: { name: { contains: search, mode: 'insensitive' } } },
    {
      playlistTracks: {
        some: {
          track: {
            title: { contains: search, mode: 'insensitive' }
          }
        }
      }
    }
  ]

  // Word-level search conditions
  const wordConditions: Prisma.PlaylistWhereInput[] = searchWords.flatMap(
    (word) => [
      { name: { contains: word, mode: 'insensitive' } },
      { description: { contains: word, mode: 'insensitive' } },
      { owner: { name: { contains: word, mode: 'insensitive' } } },
      {
        playlistTracks: {
          some: {
            track: {
              title: { contains: word, mode: 'insensitive' }
            }
          }
        }
      }
    ]
  )

  // Fuzzy search conditions
  const fuzzyConditions: Prisma.PlaylistWhereInput[] = [
    { name: { contains: search.split('').join('%'), mode: 'insensitive' } },
    {
      name: {
        startsWith: search.substring(0, Math.ceil(search.length / 2)),
        mode: 'insensitive'
      }
    }
  ]

  // Build comprehensive query with all possible search conditions
  const where: Prisma.PlaylistWhereInput = {
    isPublic: true, // Default to public playlists for search
    OR: [...exactConditions, ...wordConditions, ...fuzzyConditions]
  }

  // Execute single query with count
  const [playlists, total] = await Promise.all([
    prisma.playlist.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [{ likes: 'desc' }, { updatedAt: 'desc' }],
      skip,
      take
    }),
    prisma.playlist.count({ where })
  ])

  if (playlists.length === 0) {
    throwError('No playlists found', 404)
  }

  res.status(200).json({
    message: `Search results for "${search}"`,
    data: playlists,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(total / perPage),
      totalItems: total
    }
  })
}

const zSearchPlaylistsByPlaylistNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})

const zSearchPlaylistsByPlaylistNameReqQuery = zPagination
