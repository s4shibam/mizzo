import { scheduleSqsConsumer } from './jobs'

const startCronServer = () => {
  try {
    scheduleSqsConsumer()
    console.log('Cron server is live.')
  } catch (error) {
    console.error('Failed to start cron server', error)
    process.exit(1)
  }
}

startCronServer()

process.on('SIGINT', () => {
  console.log('Gracefully shutting down cron server')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Gracefully shutting down cron server')
  process.exit(0)
})
