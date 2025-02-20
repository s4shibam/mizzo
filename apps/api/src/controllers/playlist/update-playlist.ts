import { Request, Response } from 'express'

import { z } from 'zod'

import { s3GetKey } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'

import { isProfanity } from '../../utils/profanity-check'
import { throwError } from '../../utils/throw-error'

export const updatePlaylist = async (req: Request, res: Response) => {
  console.log('updatePlaylist*****')

  const userId = req.user.id
  const { playlistId } = zUpdatePlaylistReqParams.parse(req.params)
  const { name, description, isPublic, posterUrl, posterUpdateOption } =
    zUpdatePlaylistReqBody.parse(req.body)

  await isProfanity([name, description])

  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId
    }
  })

  if (!playlist) {
    throwError('Playlist not found', 404)
  }

  if (playlist.ownerId !== userId) {
    throwError('You are not authorized to perform this action', 403)
  }

  await prisma.playlist.update({
    where: {
      id: playlistId
    },
    data: {
      name,
      description,
      isPublic,
      posterKey:
        posterUpdateOption === 'REMOVE'
          ? null
          : posterUrl
            ? s3GetKey({ s3Url: posterUrl })
            : undefined
    }
  })

  res.status(200).json({
    message: 'Playlist updated'
  })
}

const zUpdatePlaylistReqParams = z.object({
  playlistId: z.string().cuid2()
})

const zUpdatePlaylistReqBody = z.object({
  name: z.string().min(1, 'Please enter name'),
  description: z.string().optional().nullable(),
  isPublic: z.boolean(),
  posterUrl: z.string().optional(),
  posterUpdateOption: z.enum(['NO_CHANGE', 'UPDATE', 'REMOVE'])
})
