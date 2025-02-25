import { Request, Response } from 'express'

import { z } from 'zod'

import {
  S3_DIRECTORIES,
  s3PresignedUploadUrl,
  type TS3Directory
} from '@mizzo/aws'

export const createUploadUrl = async (req: Request, res: Response) => {
  const { directory, fileName, suffix, fileSize, fileType } =
    zCreateUploadUrlReqBody.parse(req.body)

  const fileNameWithSuffix = suffix ? `${fileName}-${suffix}` : fileName

  const { uploadUrl } = await s3PresignedUploadUrl({
    fileName: fileNameWithSuffix,
    directory,
    fileSize,
    fileType
  })

  res.status(200).json({
    message: 'Successfully generated upload URL',
    data: { uploadUrl }
  })
}

const zCreateUploadUrlReqBody = z.object({
  directory: z.enum(
    Object.keys(S3_DIRECTORIES) as [TS3Directory, ...TS3Directory[]],
    {
      message: 'Invalid directory provided'
    }
  ),
  fileName: z.string({ message: 'File name is required' }),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  suffix: z.string().optional()
})
