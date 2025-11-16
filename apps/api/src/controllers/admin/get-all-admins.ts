import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'
import { zPagination } from '../../utils/zod'

export const getAllAdmins = async (req: Request, res: Response) => {
  const { search, currentPage, perPage } = zGetAllAdminsReqQuery.parse(
    req.query
  )

  const filter: Prisma.UserWhereInput = {
    isAdmin: true
  }

  if (search && search.trim().length > 0) {
    filter.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } }
    ]
  }

  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Execute queries in parallel
  const [admins, totalItems] = await Promise.all([
    prisma.user.findMany({
      where: filter,
      include: {
        profile: {
          select: {
            avatarKey: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      skip,
      take
    }),
    prisma.user.count({ where: filter })
  ])

  if (admins.length === 0) {
    throwError('No admin found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched all admins',
    data: admins,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zGetAllAdminsReqQuery = z
  .object({
    search: z.string().optional()
  })
  .extend(zPagination.shape)
