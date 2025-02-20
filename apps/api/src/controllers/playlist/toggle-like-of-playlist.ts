import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

export const toggleLikeOfPlaylist = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { playlistId } = zToggleLikeOfPlaylistReqParams.parse(req.params)

  const likedPlaylist = await prisma.likedPlaylist.findUnique({
    where: {
      userId_playlistId: {
        userId,
        playlistId
      }
    }
  })

  await prisma.$transaction(async (tx) => {
    if (likedPlaylist) {
      await tx.likedPlaylist.delete({
        where: {
          userId_playlistId: {
            userId,
            playlistId
          }
        }
      })
    } else {
      await tx.likedPlaylist.create({
        data: {
          userId,
          playlistId
        }
      })
    }

    await tx.playlist.update({
      where: {
        id: playlistId
      },
      data: {
        likes: {
          increment: likedPlaylist ? -1 : 1
        }
      }
    })
  })

  if (!likedPlaylist) {
    res.status(200).json({
      message: 'Playlist added to liked playlists'
    })
  } else {
    res.status(200).json({
      message: 'Playlist removed from liked playlists'
    })
  }
}

const zToggleLikeOfPlaylistReqParams = z.object({
  playlistId: z.string().cuid2()
})
