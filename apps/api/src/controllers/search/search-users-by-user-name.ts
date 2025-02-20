import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { getFullTextSearchQuery } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchUsersByUserName = async (req: Request, res: Response) => {
  const { search } = zSearchUsersByUserNameReqParams.parse(req.params)

  const ftsQuery = getFullTextSearchQuery(search)

  console.log({ ftsQuery })

  const users = await prisma.user.findMany({
    where: {
      isPublicProfile: true,
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          name: {
            contains: ftsQuery,
            mode: 'insensitive'
          }
        }
      ]
    },
    select: {
      id: true,
      name: true,
      profile: {
        select: {
          avatarKey: true
        }
      }
    },
    take: 5
  })

  if (users?.length === 0) {
    throwError('No artist found', 404)
  }

  res.status(200).json({
    message: `Search result for "${search}"`,
    data: users
  })
}

const zSearchUsersByUserNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})
