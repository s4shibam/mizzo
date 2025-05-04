import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { NON_PREMIUM_USER_CONSTRAINTS } from '../../constants/common'
import { throwError } from '../../utils/throw-error'

export const addTrackToPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { playlistId, trackId } = zAddTrackToPlaylistReqBody.parse(req.body)

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId
    }
  })

  if (!playlist) {
    throwError('Playlist not found', 404)
  }

  const playlistTrack = await prisma.playlistTrack.findUnique({
    where: {
      playlistId_trackId: {
        playlistId,
        trackId
      }
    }
  })

  if (playlistTrack) {
    throwError('This track is already in the playlist', 400)
  }

  const track = await prisma.track.findUnique({
    where: {
      id: trackId
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

  if (playlist.ownerId !== userId) {
    throwError('You are not authorized to perform this action', 403)
  }

  if (!req.user.isPremiumUser) {
    const trackCount = await prisma.playlistTrack.count({
      where: {
        playlistId
      }
    })

    if (trackCount >= NON_PREMIUM_USER_CONSTRAINTS.PER_PLAYLIST_TRACK_LIMIT) {
      throwError(
        `Non-premium users can only add ${NON_PREMIUM_USER_CONSTRAINTS.PER_PLAYLIST_TRACK_LIMIT} tracks per playlist. Please upgrade to premium for unlimited tracks.`,
        403
      )
    }
  }

  await prisma.playlistTrack.create({
    data: {
      playlistId,
      trackId
    }
  })

  res.status(200).json({
    message: 'Added to playlist'
  })
}

const zAddTrackToPlaylistReqBody = z.object({
  playlistId: z.string().cuid2(),
  trackId: z.string().cuid2()
})
