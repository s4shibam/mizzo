import { scheduleSqsConsumer } from './jobs'

const startCronServer = () => {
  try {
    console.log('[CRON] Server is live.')
    scheduleSqsConsumer()
  } catch (error) {
    console.error('[CRON] Failed to start cron server', error)
    process.exit(1)
  }
}

startCronServer()

process.on('SIGINT', () => {
  console.log('[CRON] Gracefully shutting down cron server')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('[CRON] Gracefully shutting down cron server')
  process.exit(0)
})
