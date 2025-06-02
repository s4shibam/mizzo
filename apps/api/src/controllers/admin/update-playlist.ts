import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Status } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { createPlaylistStatusNotification } from '../../services/notification'
import { throwError } from '../../utils/throw-error'

export const updatePlaylist = async (req: Request, res: Response) => {
  const { playlistId } = zUpdatePlaylistParams.parse(req.params)
  const { isPublic, status } = zUpdatePlaylistReqBody.parse(req.body)

  const data: { isPublic: boolean; status: Status } = {
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

  createPlaylistStatusNotification({
    userId: playlist.ownerId,
    playlistName: playlist.name,
    status
  })

  res.status(201).json({
    message: 'Playlist updated'
  })
}

const zUpdatePlaylistParams = z.object({
  playlistId: z.string().cuid2()
})

const zUpdatePlaylistReqBody = z.object({
  isPublic: z.boolean(),
  status: z.enum(STATUS_LIST as [Status, ...Status[]])
})
