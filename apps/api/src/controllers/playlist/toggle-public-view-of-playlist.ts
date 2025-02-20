import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const togglePublicViewOfPlaylist = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id
  const { playlistId } = zTogglePublicViewOfPlaylistReqParams.parse(req.params)

  const playlist = await prisma.playlist.findUnique({
    where: {
      id_ownerId: {
        id: playlistId,
        ownerId: userId
      }
    }
  })

  if (!playlist) {
    throwError(
      'Playlist not found or you are not authorized to perform this action',
      404
    )
  }

  if (!req.user?.isPublicProfile && !playlist.isPublic) {
    throwError('Make your profile public to share playlists', 403)
  }

  const updatedPlaylist = await prisma.playlist.update({
    where: {
      id: playlistId
    },
    data: {
      isPublic: {
        set: !playlist.isPublic
      }
    }
  })

  if (updatedPlaylist.isPublic) {
    res.status(200).json({
      message: 'Your playlist is visible to all'
    })
  } else {
    res.status(200).json({
      message: 'Your playlist is hidden'
    })
  }
}

const zTogglePublicViewOfPlaylistReqParams = z.object({
  playlistId: z.string().cuid2()
})
