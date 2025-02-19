import { Request, Response } from 'express'

import { z } from 'zod'

import { isS3Url, s3GetKey } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'
import { isProfane } from '@mizzo/utils'

import { formatTags } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const updateTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zUpdateTrackReqParams.parse(req.params)
  const {
    title,
    language,
    tags,
    lyrics,
    posterUrl,
    secondaryArtistIds,
    isPublic
  } = zUpdateTrackReqBody.parse(req.body)

  const profanityChecks = [title, language, tags, lyrics].filter(
    (item): item is string => item !== undefined
  )

  console.log(profanityChecks)

  const { profane } = await isProfane(profanityChecks)

  if (profane) {
    throwError('Profanity detected, please avoid using profane words', 400)
  }

  const track = await prisma.track.findUnique({
    where: {
      id_primaryArtistId: {
        id: trackId,
        primaryArtistId: userId
      }
    },
    include: {
      secondaryArtists: true
    }
  })

  if (!track) {
    throwError('Unauthorized access', 403)
  }

  // Process secondary artists if provided
  let secondaryArtistsData = undefined
  if (secondaryArtistIds) {
    const filteredSecondaryArtistIds = secondaryArtistIds.filter(
      (id) => id !== userId
    )

    // Optimize by checking all artists in a single query
    if (filteredSecondaryArtistIds.length > 0) {
      const artists = await prisma.user.findMany({
        where: {
          id: { in: filteredSecondaryArtistIds },
          isArtist: true
        },
        select: {
          id: true
        }
      })

      // Verify all artists exist and are valid
      if (artists.length !== filteredSecondaryArtistIds.length) {
        throwError('One or more invalid secondary artists provided', 400)
      }

      // Prepare artist data updates
      secondaryArtistsData = {
        disconnect: track.secondaryArtists.map((artist) => ({ id: artist.id })),
        connect: filteredSecondaryArtistIds.map((id) => ({ id }))
      }
    } else {
      // Just disconnect all if the filtered list is empty
      secondaryArtistsData = {
        disconnect: track.secondaryArtists.map((artist) => ({ id: artist.id }))
      }
    }
  }

  // Process poster if provided
  let posterKey = undefined
  if (posterUrl) {
    if (!isS3Url(posterUrl)) {
      throwError('Invalid S3 poster URL format', 400)
    }
    posterKey = s3GetKey({ s3Url: posterUrl })
    if (!posterKey) {
      throwError('Invalid S3 URL provided', 400)
    }
  }

  await prisma.track.update({
    where: {
      id: trackId
    },
    data: {
      title,
      tags: tags !== undefined ? formatTags(tags) : undefined,
      language: language?.toLowerCase(),
      lyrics,
      posterKey,
      isPublic,
      secondaryArtists: secondaryArtistsData
    }
  })

  return res.status(200).json({
    message: 'Track updated successfully'
  })
}

const zUpdateTrackReqParams = z.object({
  trackId: z.string().cuid2()
})

const zUpdateTrackReqBody = z.object({
  title: z.string().min(1, 'Please enter title').optional(),
  language: z.string().min(1, 'Please enter language').optional(),
  tags: z.array(z.string()).optional(),
  lyrics: z.string().optional(),
  posterUrl: z.string().url('Invalid poster URL').optional(),
  secondaryArtistIds: z.array(z.string().cuid2()).optional(),
  isPublic: z.boolean().optional()
})
