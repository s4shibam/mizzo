import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const increaseTrackListens = async (req: Request, res: Response) => {
  const { trackId } = zIncrementTrackListensReqParams.parse(req.params)

  const track = await prisma.track.findUnique({
    where: {
      id: trackId,
      isPublic: true,
      status: 'PUBLISHED'
    }
  })

  if (!track) {
    throwError('Track not found', 404)
  }

  await prisma.track.update({
    where: {
      id: trackId
    },
    data: {
      listens: {
        increment: 1
      }
    }
  })

  res.status(200).json({
    message: 'Track listen incremented successfully'
  })
}

const zIncrementTrackListensReqParams = z.object({
  trackId: z.string().cuid2()
})
