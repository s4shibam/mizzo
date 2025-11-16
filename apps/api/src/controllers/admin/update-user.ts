import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = zUpdateUserReqParams.parse(req.params)
  const { isPublicProfile, isPremiumUser, isArtist } = zUpdateUserReqBody.parse(
    req.body
  )

  const data: Prisma.UserUpdateInput = {
    isPublicProfile,
    isPremiumUser,
    isArtist
  }

  if (isArtist === true) {
    data.isPublicProfile = true
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data
  })

  res.status(200).json({
    message: 'User updated successfully'
  })
}

const zUpdateUserReqParams = z.object({
  userId: z.string().cuid2()
})

const zUpdateUserReqBody = z.object({
  isPublicProfile: z.boolean().optional(),
  isPremiumUser: z.boolean().optional(),
  isArtist: z.boolean().optional()
})
