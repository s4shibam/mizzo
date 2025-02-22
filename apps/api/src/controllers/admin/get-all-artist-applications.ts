import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getAllArtistApplications = async (req: Request, res: Response) => {
  const artistApplications = await prisma.userArtistApplication.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
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
    ]
  })

  if (artistApplications.length === 0) {
    throwError('No artist application found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched all artist applications',
    data: artistApplications
  })
}
