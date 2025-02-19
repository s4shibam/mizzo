import { Request, Response } from 'express'

import { z } from 'zod'

import { isS3Url, s3GetKey } from '@mizzo/aws'
import { prisma } from '@mizzo/prisma'

import { isProfanity } from '../../utils/profanity-check'
import { throwError } from '../../utils/throw-error'

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user.id
  const {
    name,
    bio,
    facebook,
    twitter,
    instagram,
    avatarUrl,
    avatarUpdateOption
  } = zUpdateProfileReqBody.parse(req.body)

  await isProfanity([name])

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true }
  })

  if (!user) {
    throwError('User not found', 404)
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      profile: {
        upsert: {
          create: {
            avatarKey:
              avatarUpdateOption === 'UPDATE' && avatarUrl
                ? s3GetKey({ s3Url: avatarUrl })
                : null,
            bio,
            facebook,
            instagram,
            twitter
          },
          update: {
            avatarKey:
              avatarUpdateOption === 'REMOVE'
                ? null
                : avatarUpdateOption === 'UPDATE' && avatarUrl
                  ? s3GetKey({ s3Url: avatarUrl })
                  : undefined,
            bio,
            facebook,
            instagram,
            twitter
          }
        }
      }
    },
    include: {
      profile: {
        select: {
          avatarKey: true,
          bio: true,
          facebook: true,
          instagram: true,
          twitter: true
        }
      }
    }
  })

  const userWithoutPassword = {
    ...updatedUser,
    password: undefined
  }

  res.status(200).json({
    message: 'Profile updated successfully',
    data: userWithoutPassword
  })
}

const zUpdateProfileReqBody = z.object({
  name: z.string().min(2, 'Please enter name'),
  bio: z.string().optional(),
  facebook: z.string().url('Invalid Facebook URL').optional().nullable(),
  twitter: z.string().url('Invalid Twitter URL').optional().nullable(),
  instagram: z.string().url('Invalid Instagram URL').optional().nullable(),
  avatarUrl: z
    .string()
    .url('Invalid avatar URL')
    .refine((url) => isS3Url(url), 'Invalid avatar URL format')
    .optional(),
  avatarUpdateOption: z.enum(['NO_CHANGE', 'UPDATE', 'REMOVE'])
})
