import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

export const getAllArtistApplications = async (req: Request, res: Response) => {
  const { isApproved, search, currentPage, perPage } =
    zGetAllArtistApplicationsReqQuery.parse(req.query)

  const filter: Prisma.UserArtistApplicationWhereInput = {}

  // Filter by approval status
  if (isApproved !== undefined) {
    filter.isApproved = isApproved
  }

  // Add search functionality
  if (search && search.trim().length > 0) {
    filter.user = {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }
  }

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Execute queries in parallel
  const [artistApplications, totalItems] = await Promise.all([
    prisma.userArtistApplication.findMany({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            isPublicProfile: true,
            isPremiumUser: true,
            profile: {
              select: {
                avatarKey: true
              }
            }
          }
        }
      },
      orderBy: [
        {
          isApproved: 'desc'
        },
        {
          createdAt: 'desc'
        }
      ],
      skip,
      take
    }),
    prisma.userArtistApplication.count({ where: filter })
  ])

  if (artistApplications.length === 0) {
    throwError('No artist application found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched all artist applications',
    data: artistApplications,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zGetAllArtistApplicationsReqQuery = z
  .object({
    isApproved: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    search: z.string().optional()
  })
  .extend(zPagination.shape)
