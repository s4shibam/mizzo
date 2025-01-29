import { NextFunction, Request, Response } from 'express'

import { env } from '../constants/env'
import { throwError } from '../utils/throw-error'

export const isCorrectSecret = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req?.headers?.authorization
  const token = authorizationHeader?.split('Bearer ')?.[1]

  if (!token) {
    throwError('Unauthorized request: No token provided', 401)
  }

  if (token !== env.apiSecretKey) {
    throwError('Unauthorized request: API secret key mismatch', 401)
  }

  next()
}
