import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { createArtistApplicationNotification } from '../../services/notification'
import { throwError } from '../../utils/throw-error'

export const manageArtistApplication = async (req: Request, res: Response) => {
  const { userId } = zManageArtistReqParams.parse(req.params)
  const { isApproved } = zManageArtistReqBody.parse(req.body)

  const artistApplication = await prisma.userArtistApplication.findUnique({
    where: {
      userId
    }
  })

  if (!artistApplication) {
    throwError('Artist application not found', 404)
  }

  await prisma.$transaction(async (tx) => {
    const isArtist = isApproved === null ? false : isApproved
    await tx.user.update({
      where: {
        id: userId
      },
      data: {
        isArtist,
        isPublicProfile: isArtist ? true : false
      }
    })

    await tx.userArtistApplication.update({
      where: { userId },
      data: {
        isApproved
      }
    })
  })

  createArtistApplicationNotification({
    userId,
    isApproved
  })

  if (isApproved) {
    res.status(201).json({
      message: 'Artist application approved'
    })
    return
  }

  res.status(201).json({
    message: 'Artist application rejected'
  })
}

const zManageArtistReqParams = z.object({
  userId: z.string().cuid2()
})

const zManageArtistReqBody = z.object({
  isApproved: z.boolean().nullable()
})
