import { Request, Response } from 'express'

import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const searchTracksByTrackName = async (req: Request, res: Response) => {
  const { search } = zSearchTracksByTrackNameReqParams.parse(req.params)
  const { currentPage, perPage } = zSearchTracksByTrackNameReqQuery.parse(
    req.query
  )

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Extract language from search if specified
  const languageMatch = search.match(/lang:(\w+)/i)
  const cleanSearch = search.replace(/lang:\w+/i, '').trim()

  // Extract individual words for better search
  const searchWords = cleanSearch.split(/\s+/).filter((word) => word.length > 2)

  // Build where conditions with proper Prisma types
  const exactConditions: Prisma.TrackWhereInput[] = [
    // Exact phrase search
    { title: { contains: cleanSearch, mode: 'insensitive' } },
    { tags: { contains: cleanSearch, mode: 'insensitive' } },
    { lyrics: { contains: cleanSearch, mode: 'insensitive' } },
    { primaryArtist: { name: { contains: cleanSearch, mode: 'insensitive' } } },
    {
      secondaryArtists: {
        some: { name: { contains: cleanSearch, mode: 'insensitive' } }
      }
    }
  ]

  // Word-level search conditions
  const wordConditions: Prisma.TrackWhereInput[] = searchWords.flatMap(
    (word) => [
      { title: { contains: word, mode: 'insensitive' } },
      { tags: { contains: word, mode: 'insensitive' } },
      { lyrics: { contains: word, mode: 'insensitive' } },
      { primaryArtist: { name: { contains: word, mode: 'insensitive' } } },
      {
        secondaryArtists: {
          some: { name: { contains: word, mode: 'insensitive' } }
        }
      }
    ]
  )

  // Fuzzy search conditions
  const fuzzyConditions: Prisma.TrackWhereInput[] = [
    {
      title: { contains: cleanSearch.split('').join('%'), mode: 'insensitive' }
    },
    {
      title: {
        startsWith: cleanSearch.substring(0, Math.ceil(cleanSearch.length / 2)),
        mode: 'insensitive'
      }
    }
  ]

  // Combine all conditions
  const where: Prisma.TrackWhereInput = {
    OR: [...exactConditions, ...wordConditions, ...fuzzyConditions]
  }

  // Add language filter if specified
  if (languageMatch) {
    where.language = languageMatch[1]
  }

  // Execute single query with count
  const [tracks, totalItems] = await Promise.all([
    prisma.track.findMany({
      where,
      include: {
        primaryArtist: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: [{ likes: 'desc' }, { listens: 'desc' }],
      skip,
      take
    }),
    prisma.track.count({ where })
  ])

  if (tracks.length === 0) {
    throwError('No tracks found', 404)
  }

  res.status(200).json({
    message: `Search results for "${search}"`,
    data: tracks,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zSearchTracksByTrackNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})

const zSearchTracksByTrackNameReqQuery = z.object({
  currentPage: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().default(10)
})
