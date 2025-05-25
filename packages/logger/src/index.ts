import { Logtail } from '@logtail/node'
import { LogtailTransport } from '@logtail/winston'
import winston from 'winston'

import { NODE_ENV, TIME_ZONE } from '@mizzo/utils'

import { sanitizeData } from './utils'

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: () =>
      new Date().toLocaleString('en-US', {
        timeZone: TIME_ZONE.asia_kolkata,
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + ' [IST]'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
)

const getTransports = (): winston.transport[] => {
  const logtailToken = process.env.LOGTAIL_TOKEN

  if (NODE_ENV === 'dev' || !logtailToken) {
    return [
      new winston.transports.Console({
        format: logFormat
      }),
      new winston.transports.File({
        filename: '.logs/error.log',
        level: 'error',
        format: logFormat
      }),
      new winston.transports.File({
        filename: '.logs/combined.log',
        format: logFormat
      })
    ]
  }

  const logtail = new Logtail(logtailToken)

  return [new LogtailTransport(logtail)]
}

const logger = winston.createLogger({
  level: NODE_ENV === 'dev' ? 'debug' : 'info',
  format: logFormat,
  transports: getTransports(),
  exitOnError: false
})

type TLogMeta = {
  req?: {
    path?: string
    method?: string
    query?: Record<string, any>
    body?: Record<string, any>
    ip?: string
    userId?: string
  }
  res?: {
    status?: number
    json?: Record<string, any>
  }
  [key: string]: any
}

export type LogParams = {
  message: string
  meta?: TLogMeta
  app?: 'API' | 'WEB' | 'CRON' | 'TRANSCODER' | 'NA'
}

const createLogger =
  (level: 'error' | 'warn' | 'info' | 'debug') =>
  ({ message, meta = {}, app = 'NA' }: LogParams) => {
    const sanitizedMeta = { ...meta }

    if (sanitizedMeta.req?.body) {
      sanitizedMeta.req = {
        ...sanitizedMeta.req,
        body: sanitizeData(sanitizedMeta.req.body)
      }
    }

    logger[level](`[${app}] ${message}`, sanitizedMeta)
  }

export const log = {
  error: createLogger('error'),
  warn: createLogger('warn'),
  info: createLogger('info'),
  debug: createLogger('debug')
}
