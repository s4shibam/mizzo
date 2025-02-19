import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { comparePassword, generateToken } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = zLoginUserReqBody.parse(req.body)

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true
    }
  })

  if (!user) {
    throwError('User not found', 404)
  }

  const isPasswordMatched = await comparePassword({
    password,
    hashedPassword: user.password
  })

  if (!isPasswordMatched) {
    throwError('Invalid credentials', 401)
  }

  const token = generateToken({
    obj: { id: user.id, name: user.name, createdAt: user.createdAt },
    expiresIn: '30d'
  })

  const artistApplication = await prisma.userArtistApplication.findUnique({
    where: {
      userId: user.id
    }
  })

  const userResponse = {
    ...user,
    password: undefined,
    token,
    isArtistApplicationSubmitted: !!artistApplication?.id || user.isArtist
  }

  res.status(201).json({
    message: 'Logged in successfully',
    data: userResponse
  })
}

const zLoginUserReqBody = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Please enter password')
})
