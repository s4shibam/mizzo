import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

export const getMyUploads = async (req: Request, res: Response) => {
  const userId = req.user.id

  const tracks = await prisma.track.findMany({
    where: {
      primaryArtistId: userId
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

  res.status(200).json({
    message: 'Successfully fetched your uploaded tracks',
    data: {
      id: 'my-uploads',
      name: 'My Uploads',
      playlistTracks: tracks
    }
  })
}
