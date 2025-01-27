import { API_PORT, NODE_ENV } from '@mizzo/utils'

import app from './app'

const startServer = async () => {
  try {
    app.listen(API_PORT, () => {
      if (NODE_ENV === 'dev') {
        console.log(`Server is live on: http://localhost:${API_PORT}`)
      } else {
        console.log(`Server is live on PORT: ${API_PORT}`)
      }
    })
  } catch (error) {
    console.error('Failed to start server...\n', error)
    process.exit(1)
  }
}

const gracefulShutdown = async () => {
  try {
    console.log('Shutting down gracefully...\n')
    process.exit(0)
  } catch (error) {
    console.error('Error during shutdown...\n', error)
    process.exit(1)
  }
}

const handleFatalError = (error: Error, type: 'rejection' | 'exception') => {
  console.error(`Shutting down due to unhandled ${type}...\n`, error)
  gracefulShutdown()
}

// Start the server
startServer()

// Handle graceful shutdown
process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

process.on('unhandledRejection', (error: Error) => {
  handleFatalError(error, 'rejection')
})

process.on('uncaughtException', (error: Error) => {
  handleFatalError(error, 'exception')
})
