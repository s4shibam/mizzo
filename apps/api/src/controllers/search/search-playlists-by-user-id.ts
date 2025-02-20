import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const searchPlaylistsByUserId = async (req: Request, res: Response) => {
  const { userId } = zSearchPlaylistsByUserIdReqParams.parse(req.params)

  const playlists = await prisma.playlist.findMany({
    where: {
      ownerId: userId,
      isPublic: true,
      status: 'PUBLISHED'
    }
  })

  if (playlists?.length === 0) {
    throwError('No Playlist found', 404)
  }

  res.status(200).json({
    message: 'Playlist(s) found',
    data: playlists
  })
}

const zSearchPlaylistsByUserIdReqParams = z.object({
  userId: z.string().cuid2()
})
