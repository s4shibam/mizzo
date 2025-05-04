import { Request, Response } from 'express'

import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const searchUsersByUserName = async (req: Request, res: Response) => {
  const { search } = zSearchUsersByUserNameReqParams.parse(req.params)
  const { currentPage, perPage } = zSearchUsersByUserNameReqQuery.parse(
    req.query
  )

  // Get isAdmin status from request user (or false by default)
  const isAdmin = req.user?.isAdmin || false

  // Calculate pagination
  const skip = (currentPage - 1) * perPage
  const take = perPage

  // Extract individual words for better search
  const searchWords = search.split(/\s+/).filter((word) => word.length > 2)

  // Exact phrase search conditions
  const exactConditions: Prisma.UserWhereInput[] = [
    { name: { contains: search, mode: 'insensitive' } },
    {
      profile: {
        bio: { contains: search, mode: 'insensitive' }
      }
    }
  ]

  // Add email search for admins
  if (isAdmin) {
    exactConditions.push({ email: { contains: search, mode: 'insensitive' } })
  }

  // Artist-specific search for tracks
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

  // Word-level search
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

      // Artist track word search
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

  // Fuzzy search conditions
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

  // Execute single query with count
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
