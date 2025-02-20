import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getMyPlaylists = async (req: Request, res: Response) => {
  const userId = req.user.id

  const playlists = await prisma.playlist.findMany({
    where: {
      ownerId: userId
    },
    include: {
      _count: {
        select: {
          playlistTracks: true
        }
      }
    }
  })

  if (playlists.length === 0) {
    throwError('No playlist found', 404)
  }

  res.status(200).json({
    message: 'Playlist(s) fetched successfully',
    data: playlists
  })
}
