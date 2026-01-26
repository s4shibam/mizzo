import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

export const getLiveLyricByTrackId = async (req: Request, res: Response) => {
  const { trackId } = zGetLiveLyricByTrackIdReqParams.parse(req.params)

  const liveLyric = await prisma.trackLiveLyric.findUnique({
    where: { trackId },
    select: {
      status: true,
      content: true
    }
  })

  if (!liveLyric) {
    return res.status(200).json({
      message: 'Lyrics not available for this track',
      data: null
    })
  }

  return res.status(200).json({
    message: 'Track live lyric retrieved successfully',
    data: liveLyric
  })
}

const zGetLiveLyricByTrackIdReqParams = z.object({
  trackId: z.string().cuid2()
})
