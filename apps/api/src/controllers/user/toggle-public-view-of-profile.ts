import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const togglePublicViewOfProfile = async (
  req: Request,
  res: Response
) => {
  const user = req?.user
  const userId = user?.id

  const publicTracks = await prisma.track.findMany({
    where: { primaryArtistId: userId, isPublic: true }
  })

  if (publicTracks?.length > 0) {
    throwError(
      `You cannot hide your profile since you have ${publicTracks?.length} public track(s)`,
      400
    )
  }

  const publicPlaylists = await prisma.playlist.findMany({
    where: { ownerId: userId, isPublic: true }
  })

  if (publicPlaylists?.length > 0) {
    throwError('Cannot hide profile as you have some public playlists', 400)
  }

  const isPublicProfileInitially = user.isPublicProfile

  await prisma.user.update({
    where: { id: userId },
    data: { isPublicProfile: !isPublicProfileInitially }
  })

  if (!isPublicProfileInitially) {
    res.status(200).json({
      message: 'Your profile is visible to all',
      data: {
        isPublicProfile: true
      }
    })
  } else {
    res.status(200).json({
      message: 'Your profile is hidden',
      data: {
        isPublicProfile: false
      }
    })
  }
}
