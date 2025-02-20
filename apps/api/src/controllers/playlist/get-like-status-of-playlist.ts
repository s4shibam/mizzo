import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

export const getLikeStatusOfPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { playlistId } = zGetLikeStatusOfPlaylistReqParams.parse(req.params)

  const likedPlaylist = await prisma.likedPlaylist.findUnique({
    where: {
      userId_playlistId: {
        userId,
        playlistId
      }
    }
  })

  if (likedPlaylist) {
    res.status(200).json({
      message: 'Playlist is liked',
      data: { isLiked: true }
    })
  } else {
    res.status(200).json({
      message: 'Playlist is not liked',
      data: { isLiked: false }
    })
  }
}

const zGetLikeStatusOfPlaylistReqParams = z.object({
  playlistId: z.string().cuid2()
})
