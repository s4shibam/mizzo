import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

export const getAllPlaylists = async (req: Request, res: Response) => {
  const { isPublic, search, currentPage, perPage } =
    zGetAllPlaylistsReqQuery.parse(req.query)

  const filter: Prisma.PlaylistWhereInput = {}

  if (isPublic !== undefined) {
    filter.isPublic = isPublic
  }

  // Add search functionality
  if (search && search.trim().length > 0) {
    filter.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ]
  }

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Execute queries in parallel
  const [playlists, totalItems] = await Promise.all([
    prisma.playlist.findMany({
      where: filter,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: {
              select: {
                avatarKey: true
              }
            }
          }
        },
        _count: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    }),
    prisma.playlist.count({ where: filter })
  ])

  if (playlists.length === 0) {
    throwError('No playlist found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched all playlists',
    data: playlists,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zGetAllPlaylistsReqQuery = z
  .object({
    isPublic: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    search: z.string().optional()
  })
  .extend(zPagination.shape)
