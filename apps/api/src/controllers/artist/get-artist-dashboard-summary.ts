import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

export const getArtistDashboardSummary = async (
  req: Request,
  res: Response
) => {
  const artistId = req.user.id

  const [
    totalTracks,
    totalPlaylists,
    totalLikesOnTracks,
    totalPlaylistsContainingTracks,
    totalLikesOnPlaylists,
    totalCollaborations
  ] = await Promise.all([
    prisma.track.count({
      where: { primaryArtistId: artistId }
    }),
    prisma.playlist.count({
      where: { ownerId: artistId }
    }),
    prisma.likedTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        }
      }
    }),
    prisma.playlistTrack.count({
      where: {
        track: {
          primaryArtistId: artistId
        }
      }
    }),
    prisma.likedPlaylist.count({
      where: {
        playlist: {
          ownerId: artistId
        }
      }
    }),
    prisma.track.count({
      where: {
        secondaryArtists: { some: { id: artistId } }
      }
    })
  ])

  res.status(200).json({
    message: 'Successfully fetched dashboard summary',
    data: {
      totalTracks,
      totalPlaylists,
      totalLikesOnTracks,
      totalLikesOnPlaylists,
      totalPlaylistsContainingTracks,
      totalCollaborations
    }
  })
}
