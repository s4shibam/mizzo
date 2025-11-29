import { randomUUID } from 'crypto'
import { NextFunction, Request, Response } from 'express'

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.id = (req.headers['x-request-id'] as string) || randomUUID()

  res.setHeader('x-request-id', req.id)

  next()
}
