import { Request, Response } from 'express'

import { z } from 'zod'

import { s3GetKey, s3PresignedDownloadUrl } from '@mizzo/aws'

import { throwError } from '../../utils/throw-error'

export const createDownloadUrl = async (req: Request, res: Response) => {
  const { url } = zCreateDownloadUrlReqBody.parse(req.body)

  const key = s3GetKey({ s3Url: url })

  if (!key) {
    throwError('Invalid URL provided', 400)
  }

  const { downloadUrl } = await s3PresignedDownloadUrl({ s3Key: key })

  res.status(200).json({
    message: 'Successfully generated download URL',
    data: { downloadUrl }
  })
}

const zCreateDownloadUrlReqBody = z.object({
  url: z.string({ message: 'URL is required' })
})
