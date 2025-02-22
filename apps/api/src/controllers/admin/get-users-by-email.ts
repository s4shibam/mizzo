import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getUsersByEmail = async (req: Request, res: Response) => {
  const { email } = zGetUsersByEmailReqParams.parse(req.params)
  const { take, isAdmin } = zGetUsersByEmailReqQuery.parse(req.query)

  const users = await prisma.user.findMany({
    where: {
      email: {
        contains: email,
        mode: 'insensitive'
      },
      isAdmin
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      profile: {
        select: {
          avatarKey: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: take ? parseInt(take) : undefined
  })

  if (users.length === 0) {
    throwError('No User found', 404)
  }

  res.status(200).json({
    message: 'User(s) found',
    data: users
  })
}

const zGetUsersByEmailReqParams = z.object({
  email: z.string().trim()
})

const zGetUsersByEmailReqQuery = z.object({
  take: z.string().optional(),
  isAdmin: z.boolean().optional()
})
