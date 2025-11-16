import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Status, type Prisma } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { createPlaylistStatusNotification } from '../../services/notification'
import { throwError } from '../../utils/throw-error'

export const updatePlaylist = async (req: Request, res: Response) => {
  const { playlistId } = zUpdatePlaylistParams.parse(req.params)
  const { isPublic, status } = zUpdatePlaylistReqBody.parse(req.body)

  const data: Prisma.PlaylistUpdateInput = {
    isPublic,
    status
  }

  // Get playlist details for notification
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId
    },
    select: {
      name: true,
      ownerId: true
    }
  })

  if (!playlist) {
    throwError('Playlist not found', 404)
  }

  await prisma.playlist.update({
    where: {
      id: playlistId
    },
    data
  })

  if (status) {
    createPlaylistStatusNotification({
      userId: playlist.ownerId,
      playlistName: playlist.name,
      status
    })
  }

  res.status(200).json({
    message: 'Playlist updated successfully'
  })
}

const zUpdatePlaylistParams = z.object({
  playlistId: z.string().cuid2()
})

const zUpdatePlaylistReqBody = z.object({
  isPublic: z.boolean().optional(),
  status: z.enum(STATUS_LIST as [Status, ...Status[]]).optional()
})
