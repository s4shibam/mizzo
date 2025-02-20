import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getLikedPlaylists = async (req: Request, res: Response) => {
  const userId = req.user.id

  const likedPlaylists = await prisma.likedPlaylist.findMany({
    where: {
      userId
    },
    include: {
      playlist: {
        include: {
          owner: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })

  const publicLikedPlaylists = likedPlaylists.filter(
    (likedPlaylist) => likedPlaylist.playlist.isPublic
  )

  if (publicLikedPlaylists?.length === 0) {
    throwError('No playlist found', 404)
  }

  const formattedPublicLikedPlaylists = publicLikedPlaylists.map(
    (likedPlaylist) => {
      return {
        ...likedPlaylist.playlist
      }
    }
  )

  res.status(200).json({
    message: 'Successfully fetched your liked playlists',
    data: formattedPublicLikedPlaylists
  })
}
