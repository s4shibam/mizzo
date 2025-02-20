import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const removeTrackFromPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId, playlistId } = zRemoveTrackFromPlaylistReqQuery.parse(
    req.query
  )

  if (!playlistId || !trackId) {
    throwError('Insufficient data', 400)
  }

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId
    }
  })

  if (!playlist) {
    throwError('Playlist not found', 404)
  }

  if (playlist.ownerId !== userId) {
    throwError(
      'You are not authorized to remove the track form this playlist',
      403
    )
  }

  await prisma.$transaction(async (tx) => {
    await tx.playlistTrack.deleteMany({
      where: {
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
          decrement: 1
        }
      }
    })
  })

  res.status(200).json({
    message: 'Track removed from the playlist'
  })
}

const zRemoveTrackFromPlaylistReqQuery = z.object({
  trackId: z.string().cuid2(),
  playlistId: z.string().cuid2()
})
