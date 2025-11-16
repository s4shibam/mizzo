import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

export const getAllUsers = async (req: Request, res: Response) => {
  const {
    isArtist,
    isPremiumUser,
    isPublicProfile,
    search,
    currentPage,
    perPage
  } = zGetAllUsersReqQuery.parse(req.query)

  const filter: Prisma.UserWhereInput = {}

  if (isArtist !== undefined) {
    filter.isArtist = isArtist
  }

  if (isPremiumUser !== undefined) {
    filter.isPremiumUser = isPremiumUser
  }

  if (isPublicProfile !== undefined) {
    filter.isPublicProfile = isPublicProfile
  }

  // Add search functionality
  if (search && search.trim().length > 0) {
    filter.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Execute queries in parallel
  const [users, totalItems] = await Promise.all([
    prisma.user.findMany({
      where: filter,
      include: {
        profile: {
          select: {
            avatarKey: true,
            facebook: true,
            instagram: true,
            twitter: true
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
    prisma.user.count({ where: filter })
  ])

  if (users.length === 0) {
    throwError('No user found', 404)
  }

  const formattedUsers = users.map((user) => {
    const obj: Record<string, any> = {
      ...user
    }
    delete obj.password
    return obj
  })

  res.status(200).json({
    message: 'Successfully fetched all users',
    data: formattedUsers,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zGetAllUsersReqQuery = z
  .object({
    isArtist: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    isPremiumUser: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    isPublicProfile: z
      .string()
      .transform((val) => val === 'true')
      .optional(),
    search: z.string().optional()
  })
  .extend(zPagination.shape)
