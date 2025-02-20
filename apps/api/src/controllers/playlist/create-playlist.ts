import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { NON_PREMIUM_USER_CONSTRAINTS } from '../../constants/common'
import { isProfanity } from '../../utils/profanity-check'
import { throwError } from '../../utils/throw-error'

export const createPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { name } = zCreatePlaylistReqBody.parse(req.body)

  await isProfanity([name])

  if (!req.user.isPremiumUser) {
    const currentPlaylistCount = await prisma.playlist.count({
      where: {
        ownerId: userId
      }
    })

    if (currentPlaylistCount >= NON_PREMIUM_USER_CONSTRAINTS.PLAYLIST_LIMIT) {
      throwError('You have reached the maximum number of playlists', 403)
    }
  }

  await prisma.playlist.create({
    data: {
      name,
      ownerId: userId
    }
  })

  res.status(201).json({
    message: 'Playlist created'
  })
}

const zCreatePlaylistReqBody = z.object({
  name: z.string().min(1, 'Please enter name')
})
