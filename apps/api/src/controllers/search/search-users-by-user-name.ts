import { Request, Response } from 'express'

import { Prisma, type User } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { cache } from '../../services/cache'
import { getCacheKey } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const searchUsersByUserName = async (req: Request, res: Response) => {
  const { search } = zSearchUsersByUserNameReqParams.parse(req.params)
  const { currentPage, perPage } = zSearchUsersByUserNameReqQuery.parse(
    req.query
  )

  const isAdmin = req.user?.isAdmin || false

  const cacheKey = getCacheKey(req)

  const cachedResult = await cache.get<{
    users: User[]
    totalItems: number
  }>(cacheKey)

  if (cachedResult) {
    return res.status(200).json({
      message: `Search results for "${search}"`,
      data: cachedResult.users,
      pagination: {
        currentPage,
        perPage,
        totalPages: Math.ceil(cachedResult.totalItems / perPage),
        totalItems: cachedResult.totalItems
      }
    })
  }

  const skip = (currentPage - 1) * perPage
  const take = perPage

  const searchWords = search.split(/\s+/).filter((word) => word.length > 2)

  const exactConditions: Prisma.UserWhereInput[] = [
    { name: { contains: search, mode: 'insensitive' } },
    {
      profile: {
        bio: { contains: search, mode: 'insensitive' }
      }
    }
  ]

  if (isAdmin) {
    exactConditions.push({ email: { contains: search, mode: 'insensitive' } })
  }

  const artistTrackSearch: Prisma.UserWhereInput = {
    isArtist: true,
    OR: [
      {
        primaryTracks: {
          some: {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { tags: { contains: search, mode: 'insensitive' } }
            ]
          }
        }
      },
      {
        secondaryTracks: {
          some: {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { tags: { contains: search, mode: 'insensitive' } }
            ]
          }
        }
      }
    ]
  }

  exactConditions.push(artistTrackSearch)

  const wordConditions: Prisma.UserWhereInput[] = searchWords.flatMap(
    (word) => {
      const conditions: Prisma.UserWhereInput[] = [
        { name: { contains: word, mode: 'insensitive' } },
        {
          profile: {
            bio: { contains: word, mode: 'insensitive' }
          }
        }
      ]

      if (isAdmin) {
        conditions.push({ email: { contains: word, mode: 'insensitive' } })
      }

      conditions.push({
        isArtist: true,
        OR: [
          {
            primaryTracks: {
              some: {
                OR: [
                  { title: { contains: word, mode: 'insensitive' } },
                  { tags: { contains: word, mode: 'insensitive' } }
                ]
              }
            }
          },
          {
            secondaryTracks: {
              some: {
                OR: [
                  { title: { contains: word, mode: 'insensitive' } },
                  { tags: { contains: word, mode: 'insensitive' } }
                ]
              }
            }
          }
        ]
      })

      return conditions
    }
  )

  const fuzzyConditions: Prisma.UserWhereInput[] = [
    { name: { contains: search.split('').join('%'), mode: 'insensitive' } },
    {
      name: {
        startsWith: search.substring(0, Math.ceil(search.length / 2)),
        mode: 'insensitive'
      }
    }
  ]

  const where: Prisma.UserWhereInput = {
    OR: [...exactConditions, ...wordConditions, ...fuzzyConditions]
  }

  if (!isAdmin) {
    where.isPublicProfile = true
  }

  const [users, totalItems] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: isAdmin,
        isArtist: true,
        isPremiumUser: true,
        isPublicProfile: true,
        profile: {
          select: {
            avatarKey: true,
            bio: true
          }
        }
      },
      orderBy: { name: 'asc' },
      skip,
      take
    }),
    prisma.user.count({ where })
  ])

  if (users.length === 0) {
    throwError('No users found', 404)
  }

  await cache.set({
    key: cacheKey,
    value: { users, totalItems },
    options: {
      ttl: 5 * 60
    }
  })

  res.status(200).json({
    message: `Search results for "${search}"`,
    data: users,
    pagination: {
      currentPage,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems
    }
  })
}

const zSearchUsersByUserNameReqParams = z.object({
  search: z
    .string()
    .min(1, 'Search query is required')
    .transform((val) => val.trim())
})

const zSearchUsersByUserNameReqQuery = z.object({
  currentPage: z.coerce.number().positive().default(1),
  perPage: z.coerce.number().positive().default(10)
})
