import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, TrackLiveLyricStatus, type Prisma } from '@mizzo/prisma'

export const updateTrackLiveLyric = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackLiveLyricReqParams.parse(req.params)
  const { status, content, errorMessage } = zUpdateTrackLiveLyricReqBody.parse(
    req.body
  )

  const liveLyric = await prisma.trackLiveLyric.update({
    where: { trackId },
    data: {
      status,
      content: content as Prisma.InputJsonValue,
      errorMessage
    }
  })

  return res.status(200).json({
    message: 'Success',
    data: liveLyric
  })
}

const zUpdateTrackLiveLyricReqParams = z.object({
  trackId: z.cuid2()
})

const zLiveLyricContentSchema = z.object({
  lines: z.array(
    z.object({
      startTime: z.number(),
      endTime: z.number(),
      text: z.string()
    })
  )
})

const zUpdateTrackLiveLyricReqBody = z.object({
  status: z.enum(TrackLiveLyricStatus, {
    message: 'Invalid status value'
  }),
  content: zLiveLyricContentSchema.optional().nullable(),
  errorMessage: z.string().optional().nullable()
})
