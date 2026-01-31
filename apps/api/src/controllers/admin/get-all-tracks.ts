import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

type TStatusList = (typeof STATUS_LIST)[number] | 'ALL'

export const getAllTracks = async (req: Request, res: Response) => {
  const { isPublic, language, status, search, currentPage, perPage } =
    zGetAllTracksQuery.parse(req.query)
  const trimmedSearch = search?.trim()

  const filter: Prisma.TrackWhereInput = {}

  if (isPublic !== undefined) {
    filter.isPublic = isPublic
  }

  if (language) {
    filter.language = {
      equals: language,
      mode: 'insensitive'
    }
  }

  if (status && status !== 'ALL') {
    filter.status = status
  }

  // Add search functionality
  if (trimmedSearch && trimmedSearch.length > 0) {
    filter.OR = [
      { title: { contains: trimmedSearch, mode: 'insensitive' } },
      {
        primaryArtist: {
          name: { contains: trimmedSearch, mode: 'insensitive' }
        }
      },
      {
        secondaryArtists: {
          some: { name: { contains: trimmedSearch, mode: 'insensitive' } }
        }
      }
    ]
  }

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Execute queries in parallel
  const [tracks, totalItems] = await Promise.all([
    prisma.track.findMany({
      where: filter,
      include: {
        primaryArtist: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarKey: true
              }
            }
          }
        },
        secondaryArtists: {
          select: {
            id: true,
            name: true,
            profile: {
              select: {
                avatarKey: true
              }
            }
          }
        },
        _count: {
          select: {
            likedTrack: true,
            playlistTracks: true
          }
        },
        liveLyric: {
          select: {
            status: true,
            workflowId: true,
            errorMessage: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    }),
    prisma.track.count({ where: filter })
  ])

  if (tracks.length === 0) {
    throwError('No track found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched all tracks',
    data: tracks,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zGetAllTracksQuery = z
  .object({
    isPublic: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    language: z.string().optional(),
    status: z
      .enum(['ALL', ...STATUS_LIST] as [TStatusList, ...TStatusList[]])
      .optional(),
    search: z.string().optional()
  })
  .extend(zPagination.shape)
