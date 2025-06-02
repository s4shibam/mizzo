import serverless from 'serverless-http'

import 'source-map-support/register'

import app from './app'

const handleFatalError = (error: Error, type: 'rejection' | 'exception') => {
  console.error(`Lambda error - unhandled ${type}...\n`, error)
}

process.on('unhandledRejection', (error: Error) => {
  handleFatalError(error, 'rejection')
})

process.on('uncaughtException', (error: Error) => {
  handleFatalError(error, 'exception')
})

export const handler = serverless(app)
