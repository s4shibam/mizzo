import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const searchTracksByUserId = async (req: Request, res: Response) => {
  const { userId } = zSearchTracksByUserIdReqParams.parse(req.params)

  const tracks = await prisma.track.findMany({
    where: {
      primaryArtistId: userId,
      isPublic: true,
      status: 'PUBLISHED'
    },
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  if (tracks?.length === 0) {
    throwError('No track found', 404)
  }

  res.status(200).json({
    message: 'Track(s) found',
    data: tracks
  })
}

const zSearchTracksByUserIdReqParams = z.object({
  userId: z.string().cuid2()
})
