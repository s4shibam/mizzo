import { Request, Response } from 'express'

import { z } from 'zod'

import { isS3Url, s3GetKey } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'
import { isProfane } from '@mizzo/utils'

import { formatTags } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const uploadTrack = async (req: Request, res: Response) => {
  const userId = req.user.id
  console.log(req.body)
  const {
    id,
    title,
    language,
    duration,
    tags,

    posterUrl,
    trackUrl,
    secondaryArtistIds
  } = zUploadTrackReqBody.parse(req.body)

  const profanityChecks = [title, language, tags].filter(
    (item): item is string => item !== undefined
  )

  const { profane } = await isProfane(profanityChecks)

  if (profane) {
    throwError('Profanity detected in submitted data', 400)
  }

  const filteredSecondaryArtistIds = secondaryArtistIds.filter(
    ({ id }) => id !== userId
  )

  for (const secondaryArtist of filteredSecondaryArtistIds) {
    const artist = await prisma.user.findUnique({
      where: { id: secondaryArtist.id },
      select: {
        isArtist: true,
        isPublicProfile: true
      }
    })

    if (!artist || !artist.isArtist) {
      throwError('Invalid secondary artist provided', 400)
    }
  }

  const posterKey = s3GetKey({ s3Url: posterUrl })
  const trackKey = s3GetKey({ s3Url: trackUrl })

  if (!posterKey || !trackKey) {
    throwError('Invalid S3 URLs provided', 400)
  }

  const newTrack = await prisma.track.create({
    data: {
      id,
      primaryArtistId: userId,
      title,
      language: language.toLowerCase(),
      duration,
      tags,
      posterKey,
      trackKey,
      liveLyric: {
        create: {}
      },
      secondaryArtists: {
        connect: filteredSecondaryArtistIds
      }
    }
  })

  return res.status(201).json({
    message: 'Track uploaded successfully',
    data: {
      id: newTrack.id,
      title: newTrack.title
    }
  })
}

const zUploadTrackReqBody = z.object({
  id: z.string().min(1, 'Track ID is required'),
  title: z.string().min(1, 'Please enter title'),
  language: z.string().min(1, 'Please enter language'),
  duration: z.number().transform(Number),
  tags: z
    .array(z.string())
    .optional()
    .transform((val) => formatTags(val)),
  posterUrl: z
    .string()
    .url('Invalid poster URL')
    .refine((url) => isS3Url(url), 'Invalid S3 poster URL format'),
  trackUrl: z
    .string()
    .url('Invalid track URL')
    .refine((url) => isS3Url(url), 'Invalid S3 track URL format'),
  secondaryArtistIds: z
    .array(z.string().cuid2())
    .optional()
    .default([])
    .transform((val) => val.map((id) => ({ id })))
})
