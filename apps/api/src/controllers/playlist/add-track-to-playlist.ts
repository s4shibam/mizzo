import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

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

  await prisma.$transaction(async (tx) => {
    await tx.playlistTrack.create({
      data: {
        playlistId,
        trackId
      }
    })

    await tx.playlist.update({
      where: {
        id: playlistId
      },
      data: {
        tracksCount: {
          increment: 1
        }
      }
    })
  })

  res.status(200).json({
    message: 'Added to playlist'
  })
}

const zAddTrackToPlaylistReqBody = z.object({
  playlistId: z.string().cuid2(),
  trackId: z.string().cuid2()
})
