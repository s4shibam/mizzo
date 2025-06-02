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
      const deviceInfo = extractUserAgentInfo(req)

      log.info({
        app: 'API',
        message: json.message,
        meta: {
          req: {
            path: req.path,
            method: req.method,
            query: req.query,
            body: req.body,
            ip: req.ip,
            userId: 'NA'
          },
          res: {
            status: res.statusCode,
            json
          },
          deviceInfo: NODE_ENV !== 'development' ? deviceInfo : undefined
        }
      })
    }

    return original_json.call(this, json)
  }

  next()
}
