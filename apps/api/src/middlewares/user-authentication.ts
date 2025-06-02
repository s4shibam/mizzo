import { NextFunction, Request, Response } from 'express'

import { z } from 'zod'

import { prisma, User } from '@mizzo/prisma'

import { verifyToken } from '../utils/functions'
import { throwError } from '../utils/throw-error'

export const isAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req?.headers?.authorization
  const token = authorizationHeader?.split('Bearer ')?.[1]

  if (!token) {
    throwError('Unauthorized request', 401)
  }

  const verifiedUser = verifyToken(token) as User
  const { id } = zCuid.parse(verifiedUser)

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      profile: true
    }
  })

  if (!user) {
    throwError('User not found', 404)
  }

  req.user = user

  next()
}

const zCuid = z.object({
  id: z.string().cuid2()
})
