import { NextFunction, Request, Response } from 'express'

import { log } from '@mizzo/logger'
import { NODE_ENV } from '@mizzo/utils'

import { extractUserAgentInfo } from '../utils/functions'

export const successHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const original_json = res.json

  res.json = function (json: any): Response {
    if (Number(res.statusCode) < 400) {
      const isDev = NODE_ENV === 'development'
      const ip = isDev ? undefined : req.ip
      const deviceInfo = isDev ? undefined : extractUserAgentInfo(req)
      const query = Object.keys(req.query).length > 0 ? req.query : undefined
      const userId = req.user?.id || 'anon'

      log.info({
        app: 'API',
        message: json.message,
        meta: {
          req: {
            id: req.id,
            ip,
            path: req.path,
            method: req.method,
            query,
            userId
          },
          statusCode: res.statusCode,
          deviceInfo
        }
      })
    }

    return original_json.call(this, json)
  }

  next()
}
