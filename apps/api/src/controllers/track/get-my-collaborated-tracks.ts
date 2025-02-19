import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getMyCollaboratedTracks = async (req: Request, res: Response) => {
  const userId = req.user.id

  const tracks = await prisma.track.findMany({
    where: {
      secondaryArtists: {
        some: {
          id: userId
        }
      }
    },
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      },
      secondaryArtists: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (tracks.length === 0) {
    throwError('No collaborations found', 404)
  }

  res.status(200).json({
    message: 'Successfully fetched your collaborated tracks',
    data: tracks
  })
}
