import { NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'

import { log } from '@mizzo/logger'
import { Prisma } from '@mizzo/prisma'
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
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    customError = { ...handlePrismaError(err), stack: err.stack }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    customError = { ...handlePrismaInitError(), stack: err.stack }
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    customError = { ...handlePrismaInternalError(), stack: err.stack }
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    customError = { ...handlePrismaUnknownError(), stack: err.stack }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    customError = { ...handlePrismaValidationError(), stack: err.stack }
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

const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError
): TError => {
  let message = 'Database operation failed'
  let statusCode = 500

  if (NODE_ENV === 'development') {
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
      case 'P2025':
        statusCode = 404
        message = 'Record not found'
        break
      default:
        message = `Database error: ${err.code}`
    }
  }

  return {
    message,
    statusCode
  }
}

const handlePrismaInitError = (): TError => {
  return {
    message: 'Database connection error. Please try again later.',
    statusCode: 503
  }
}

const handlePrismaInternalError = (): TError => {
  return {
    message: 'Internal database error. Please try again later.',
    statusCode: 500
  }
}

const handlePrismaUnknownError = (): TError => {
  return {
    message: 'Unexpected database error. Please try again later.',
    statusCode: 500
  }
}

const handlePrismaValidationError = (): TError => {
  return {
    message: 'Invalid database query. Please try again later.',
    statusCode: 400
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
    stack: NODE_ENV === 'production' ? undefined : err.stack,
    validationError: NODE_ENV === 'production' ? undefined : err.validationError
  }

  const deviceInfo = extractUserAgentInfo(req)
  const ip =
    req.ip ||
    req.socket.remoteAddress ||
    (Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'][0]
      : req.headers['x-forwarded-for']) ||
    'unknown'

  // Log the original error for debugging
  log.error({
    app: 'API',
    message: err.message,
    meta: {
      req: {
        method: req.method,
        path: req.path,
        query: req.query,
        body: req.body,
        ip: NODE_ENV !== 'development' ? ip : undefined,
        userId: 'NA'
      },
      res: {
        status: errorResponse.statusCode,
        json: {
          message: errorResponse.message,
          validationError: errorResponse.validationError
        }
      },
      stack: err.stack,
      deviceInfo: NODE_ENV !== 'development' ? deviceInfo : undefined
    }
  })

  res.status(errorResponse.statusCode).json(errorResponse)
}
