import { NextFunction, Request, Response } from 'express'

import {
  createFixedWindowRateLimiter,
  createTokenBucketRateLimiter
} from '../services/rate-limit'
import { getIp } from '../utils/functions'
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
    const ip = getIp(req)

    const key = `ip:${ip}:route:${req.path}`

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
