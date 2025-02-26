import { log } from '@mizzo/logger'
import { prisma, Status } from '@mizzo/prisma'

type TNotificationTagType =
  | 'track_publish'
  | 'track_block'
  | 'track_review'
  | 'artist_approved'
  | 'artist_rejected'
  | 'playlist_publish'
  | 'playlist_block'
  | 'playlist_review'

export const createNotification = async ({
  userId,
  tag,
  message
}: {
  userId: string
  tag: TNotificationTagType
  message: string
}) => {
  return await prisma.notification.create({
    data: {
      userId,
      tag,
      message
    }
  })
}

export const createTrackStatusNotification = ({
  userId,
  trackTitle,
  status
}: {
  userId: string
  trackTitle: string
  status: Status
}) => {
  let tag: TNotificationTagType
  let message: string

  switch (status) {
    case 'PUBLISHED':
      tag = 'track_publish'
      message = `Your track "${trackTitle}" has been published and is now available to the public.`
      break
    case 'BLOCKED':
      tag = 'track_block'
      message = `Your track "${trackTitle}" has been blocked. Please contact support for more information.`
      break
    case 'REVIEWING':
      tag = 'track_review'
      message = `Your track "${trackTitle}" is under review.`
      break
    default:
      return null
  }

  createNotification({
    userId,
    tag,
    message
  }).catch((error) => {
    log.error({
      message: 'Failed to create track status notification',
      meta: {
        error
      },
      app: 'API'
    })
  })
}

export const createArtistApplicationNotification = ({
  userId,
  isApproved
}: {
  userId: string
  isApproved: boolean | null
}) => {
  if (isApproved === null) {
    return null
  }

  const tag: TNotificationTagType = isApproved
    ? 'artist_approved'
    : 'artist_rejected'
  const message = isApproved
    ? 'Congratulations! Your artist application has been approved. You can now publish your tracks.'
    : 'Your artist application has been rejected. Please contact support for more information.'

  createNotification({
    userId,
    tag,
    message
  }).catch((error) => {
    log.error({
      message: 'Failed to create artist application notification',
      meta: {
        error
      },
      app: 'API'
    })
  })
}

export const createPlaylistStatusNotification = ({
  userId,
  playlistName,
  status
}: {
  userId: string
  playlistName: string
  status: Status
}) => {
  let tag: TNotificationTagType
  let message: string

  switch (status) {
    case 'PUBLISHED':
      tag = 'playlist_publish'
      message = `Your playlist "${playlistName}" has been published and is now available to the public.`
      break
    case 'BLOCKED':
      tag = 'playlist_block'
      message = `Your playlist "${playlistName}" has been blocked. Please contact support for more information.`
      break
    case 'REVIEWING':
      tag = 'playlist_review'
      message = `Your playlist "${playlistName}" is under review.`
      break
    default:
      return null
  }

  createNotification({
    userId,
    tag,
    message
  }).catch((error) => {
    log.error({
      message: 'Failed to create playlist status notification',
      meta: {
        error
      },
      app: 'API'
    })
  })
}
