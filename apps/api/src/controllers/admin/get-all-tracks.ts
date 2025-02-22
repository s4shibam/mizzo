import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, type Prisma } from '@mizzo/prisma'

import { STATUS_LIST } from '../../constants/common'
import { throwError } from '../../utils/throw-error'

type TStatusList = (typeof STATUS_LIST)[number] | 'ALL'

export const getAllTracks = async (req: Request, res: Response) => {
  const { isPublic, language, status } = zGetAllTracksQuery.parse(req.query)

  const filter: Prisma.TrackWhereInput = {}

  if (isPublic !== undefined) {
    filter.isPublic = isPublic
  }

  if (language) {
    filter.language = language
  }

  if (status && status !== 'ALL') {
    filter.status = status
  }

  const tracks = await prisma.track.findMany({
    where: filter,
    include: {
      primaryArtist: {
        select: {
          id: true,
          name: true,
          profile: {
            select: {
              avatarKey: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (tracks.length === 0) {
    throwError('No track found', 404)
  }

  res.status(201).json({
    message: 'Successfully fetched all tracks',
    data: tracks
  })
}

const zGetAllTracksQuery = z.object({
  isPublic: z.boolean().optional(),
  language: z.string().optional(),
  status: z
    .enum(['ALL', ...STATUS_LIST] as [TStatusList, ...TStatusList[]])
    .optional()
})
