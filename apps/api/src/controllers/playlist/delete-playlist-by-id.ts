import { Request, Response } from 'express'

import { z } from 'zod'

import { s3DeleteObject } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const deletePlaylistById = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { playlistId } = zDeletePlaylistByIdReqParams.parse(req.params)

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId
    }
  })

  if (playlist?.ownerId !== userId) {
    throwError('Unauthorized access', 403)
  }

  await prisma.playlist.delete({
    where: {
      id_ownerId: {
        id: playlistId,
        ownerId: userId
      }
    }
  })

  if (playlist.posterKey) {
    await s3DeleteObject({ s3Key: playlist.posterKey })
  }

  res.status(200).json({
    message: 'Playlist deleted'
  })
}

const zDeletePlaylistByIdReqParams = z.object({
  playlistId: z.string().cuid2()
})
