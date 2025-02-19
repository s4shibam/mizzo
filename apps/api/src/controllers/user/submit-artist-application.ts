import { Request, Response } from 'express'

import { z } from 'zod'

import { isS3Url, s3GetKey } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

const zSubmitArtistApplicationReqBody = z.object({
  message: z.string().min(1, 'Please enter a message'),
  idProofType: z.string().min(1, 'Please enter ID proof type'),
  idProofUrl: z
    .string()
    .url('Invalid ID proof URL')
    .refine((url) => isS3Url(url), 'Invalid ID proof URL format')
})

export const submitArtistApplication = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { message, idProofType, idProofUrl } =
    zSubmitArtistApplicationReqBody.parse(req.body)

  const isApplicationAvailable = await prisma.userArtistApplication.findUnique({
    where: {
      userId
    }
  })

  if (isApplicationAvailable) {
    throwError('Application already submitted', 400)
  }

  const idProofKey = s3GetKey({ s3Url: idProofUrl })

  if (!idProofKey) {
    throwError('Invalid URL provided', 400)
  }

  await prisma.userArtistApplication.create({
    data: {
      userId,
      message,
      idProofType,
      idProofKey
    }
  })

  res.status(200).json({
    message: 'Artist application submitted successfully',
    data: { isArtistApplicationSubmitted: true }
  })
}
