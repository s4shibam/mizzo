import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const searchUserByUserId = async (req: Request, res: Response) => {
  const { userId } = zSearchUserByUserIdReqParams.parse(req.params)
  const { as } = zSearchUserByUserIdReqQuery.parse(req.query)

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      isPublicProfile: true,
      isArtist: as === 'artist'
    },
    select: {
      id: true,
      name: true,
      isPublicProfile: true,
      createdAt: true,
      profile: {
        select: {
          avatarKey: true,
          bio: true,
          facebook: true,
          instagram: true,
          twitter: true
        }
      }
    }
  })

  if (!user) {
    if (as === 'artist') {
      throwError('Artist not found', 404)
    } else {
      throwError('User not found', 404)
    }
  }

  res.status(200).json({
    message: 'Artist found',
    data: user
  })
}

const zSearchUserByUserIdReqParams = z.object({
  userId: z.string().cuid2()
})

const zSearchUserByUserIdReqQuery = z.object({
  as: z.enum(['user', 'artist']).optional()
})
