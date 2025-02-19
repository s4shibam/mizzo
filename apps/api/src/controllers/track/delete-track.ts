import { Request, Response } from 'express'

import { z } from 'zod'

import { s3DeleteObject } from '@mizzo/aws'
import { log } from '@mizzo/logger'
import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const deleteTrackById = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { trackId } = zDeleteTrackByIdReqParams.parse(req.params)

  const track = await prisma.track.findUnique({
    where: {
      id_primaryArtistId: {
        id: trackId,
        primaryArtistId: userId
      }
    },
    select: {
      title: true,
      posterKey: true,
      trackKey: true
    }
  })

  if (!track) {
    throwError('Track not found or you are not authorized to delete it', 404)
  }

  await prisma.track.delete({
    where: {
      id: trackId
    }
  })

  const deletePromises = []

  if (track.posterKey) {
    deletePromises.push(
      s3DeleteObject({ s3Key: track.posterKey }).catch((error) => {
        log.error({
          message: 'S3 Poster deletion failed',
          meta: { error, trackId },
          app: 'API'
        })
      })
    )
  }

  if (track.trackKey) {
    deletePromises.push(
      s3DeleteObject({ s3Key: track.trackKey }).catch((error) => {
        log.error({
          message: 'S3 Track deletion failed',
          meta: { error, trackId },
          app: 'API'
        })
      })
    )
  }

  Promise.all(deletePromises).catch()

  res.status(200).json({
    message: `Your track ${track?.title} has been deleted`
  })
}

const zDeleteTrackByIdReqParams = z.object({
  trackId: z.string().cuid2()
})
