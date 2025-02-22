import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getAllUsers = async (req: Request, res: Response) => {
  const { isArtist, isPremiumUser, isPublicProfile } =
    zGetAllUsersReqQuery.parse(req.query)

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

  const users = await prisma.user.findMany({
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
    }
  })

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

  res.status(201).json({
    message: 'Successfully fetched all users',
    data: formattedUsers
  })
}

const zGetAllUsersReqQuery = z.object({
  isArtist: z.boolean().optional(),
  isPremiumUser: z.boolean().optional(),
  isPublicProfile: z.boolean().optional()
})
