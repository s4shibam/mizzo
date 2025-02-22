import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = zUpdateUserReqParams.parse(req.params)
  const { isPublicProfile, isPremiumUser, isArtist } = zUpdateUserReqBody.parse(
    req.body
  )

  const data: {
    isPublicProfile: boolean
    isPremiumUser: boolean
    isArtist: boolean
  } = {
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

  res.status(201).json({
    message: 'User updated successfully'
  })
}

const zUpdateUserReqParams = z.object({
  userId: z.string().cuid2()
})

const zUpdateUserReqBody = z.object({
  isPublicProfile: z.boolean(),
  isPremiumUser: z.boolean(),
  isArtist: z.boolean()
})
