import { NextFunction, Request, Response } from 'express'

import { NODE_ENV } from '@mizzo/utils'

import {
  createFixedWindowRateLimiter,
  createTokenBucketRateLimiter
} from '../services/rate-limit'
import { throwError } from '../utils/throw-error'

type TRateLimitParams =
  | {
      strategy: 'tokenBucket'
      capacity: number
      refillRate: number
    }
  | {
      strategy: 'fixedWindow'
      limit: number
      windowSizeInSeconds: number
    }

export const ratelimit = (params: TRateLimitParams) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const ip = (
      req.ip ||
      (Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.headers['x-forwarded-for']) ||
      req.socket.remoteAddress ||
      'anon'
    ).toString()

    const key = `ip:${NODE_ENV === 'dev' ? 'localhost' : ip}:route:${req.path}`

    if (params.strategy === 'tokenBucket') {
      const rateLimiter = createTokenBucketRateLimiter(
        params.capacity,
        params.refillRate
      )
      const allowed = await rateLimiter.isAllowed(key)

      if (!allowed) {
        throwError('Too Many Requests, please try again later', 429)
      }

      next()
    }

    if (params.strategy === 'fixedWindow') {
      const rateLimiter = createFixedWindowRateLimiter(
        params.limit,
        params.windowSizeInSeconds
      )
      const allowed = await rateLimiter.isAllowed(key)

      if (!allowed) {
        throwError('Too Many Requests, please try again later', 429)
      }

      next()
    }
  }
}
