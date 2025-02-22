import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getAllPlaylists = async (req: Request, res: Response) => {
  const playlists = await prisma.playlist.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              avatarKey: true
            }
          }
        }
      },
      _count: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (playlists.length === 0) {
    throwError('No playlist found', 404)
  }

  res.status(201).json({
    message: 'Successfully fetched all playlists',
    data: playlists
  })
}
