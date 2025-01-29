import { NextFunction, Request, Response } from 'express'

import { User } from '@prisma/client'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { verifyToken } from '../utils/functions'
import { throwError } from '../utils/throw-error'

export const addRequestorDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req?.headers?.authorization
  const token = authorizationHeader?.split('Bearer ')?.[1]

  const { as } = zAddRequestorDetailsReqQParams.parse(req?.query)

  if (as && ['owner', 'admin', 'artist'].includes(as) && !token) {
    throwError('Unauthorized request', 401)
  }

  if (token) {
    const verifiedUser = verifyToken(token) as User
    const { id } = zCuid.parse(verifiedUser)

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true
      }
    })

    if (as && as === 'admin' && !user?.isAdmin) {
      throwError('You are not authorized to access this resource', 400)
    }

    if (as && as === 'artist' && !user?.isArtist) {
      throwError('You are not authorized to access this resource', 400)
    }

    if (user) {
      req.user = user
    }
  }

  next()
}

const zCuid = z.object({
  id: z.string().cuid2()
})

const zAddRequestorDetailsReqQParams = z.object({
  as: z.enum(['admin', 'artist', 'owner', 'user']).optional()
})
