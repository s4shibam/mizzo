import { NextFunction, Request, Response } from 'express'

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

import { log } from '@mizzo/logger'
import { NODE_ENV, TError } from '@mizzo/utils'

import CustomError from '../utils/CustomError'
import { extractUserAgentInfo } from '../utils/functions'

export const errorHandler = (
  err: Error | ZodError | CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let customError: TError = err as unknown as TError

  if (err instanceof ZodError) {
    customError = { ...handleZodError(err), stack: err.stack }
  } else if (err instanceof PrismaClientKnownRequestError) {
    customError = { ...handlePrismaError(err), stack: err.stack }
  }

  sendErrorAsResponse(customError, req, res)
}

const handleZodError = (err: ZodError): TError => {
  const invalidFields = err.errors.map((error) => error.path.join('.'))
  return {
    message: 'Invalid input. Please check your entries and try again.',
    statusCode: 400,
    validationError: {
      fields: invalidFields,
      details: err.errors.map((error) => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code
      }))
    }
  }
}

const handlePrismaError = (err: PrismaClientKnownRequestError): TError => {
  let message = 'Unknown error occurred'
  let statusCode = 500
  if (NODE_ENV === 'dev') {
    switch (err.code) {
      case 'P2002':
        statusCode = 400
        message = `Duplicate field value: ${err.meta?.target || 'unknown'}`
        break
      case 'P2014':
        statusCode = 400
        message = `Invalid Id: ${err.meta?.target || 'unknown'}`
        break
      case 'P2003':
        statusCode = 400
        message = `Invalid input data: ${err.meta?.target || 'unknown'}`
        break
      default:
        message = `Something went wrong: ${err.message}`
    }
  }

  return {
    message,
    statusCode
  }
}

const sendErrorAsResponse = (
  err: TError,
  req: Request,
  res: Response
): void => {
  const errorResponse: TError = {
    message: err.message || 'Unknown error occurred',
    statusCode: err.statusCode || 500,
    stack: NODE_ENV === 'prod' ? undefined : err.stack,
    validationError: NODE_ENV === 'prod' ? undefined : err.validationError
  }

  const deviceInfo = extractUserAgentInfo(req)
  const ip =
    req.ip ||
    req.socket.remoteAddress ||
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']) ||
    'unknown'

  log.error({
    app: 'API',
    message: errorResponse.message,
    meta: {
      req: {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        ip: NODE_ENV !== 'dev' ? ip : undefined,
        userId: 'NA'
      },
      res: {
        status: errorResponse.statusCode,
        json: {
          message: errorResponse.message,
          validationError: errorResponse.validationError
        }
      },
      stack: errorResponse.stack,
      deviceInfo: NODE_ENV !== 'dev' ? deviceInfo : undefined
    }
  })

  res.status(errorResponse.statusCode).json(errorResponse)
}
