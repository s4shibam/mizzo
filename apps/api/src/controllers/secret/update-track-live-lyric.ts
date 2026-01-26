import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, TrackLiveLyricStatus } from '@mizzo/prisma'

export const updateTrackLiveLyric = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackLiveLyricReqParams.parse(req.params)
  const { status, content, errorMessage } = zUpdateTrackLiveLyricReqBody.parse(
    req.body
  )

  const liveLyric = await prisma.trackLiveLyric.update({
    where: { trackId },
    data: {
      status,
      content,
      errorMessage
    }
  })

  return res.status(200).json({
    message: 'Success',
    data: liveLyric
  })
}

const zUpdateTrackLiveLyricReqParams = z.object({
  trackId: z.string().cuid2()
})

const zUpdateTrackLiveLyricReqBody = z.object({
  status: z.nativeEnum(TrackLiveLyricStatus, {
    message: 'Invalid status value'
  }),
  content: z.any().optional().nullable(),
  errorMessage: z.string().optional().nullable()
})
