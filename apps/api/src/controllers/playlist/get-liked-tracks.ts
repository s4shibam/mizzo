import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

export const getLikedTracks = async (req: Request, res: Response) => {
  const userId = req.user.id

  const likedTracks = await prisma.likedTrack.findMany({
    where: {
      userId
    },
    include: {
      track: {
        include: {
          primaryArtist: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  })

  const publicLikedTracks = likedTracks.filter(
    (likedTrack) => likedTrack.track.isPublic
  )

  const formattedPublicLikedTracks = publicLikedTracks.map((likedTrack) => {
    return {
      ...likedTrack.track
    }
  })

  res.status(200).json({
    message: 'Successfully fetched your liked tracks',
    data: {
      id: 'liked-songs',
      name: 'Liked Songs',
      playlistTracks: formattedPublicLikedTracks
    }
  })
}
