import { scheduleSqsConsumer } from './jobs'
import { startTemporalWorker } from './temporal/worker'

const startCronServer = () => {
  try {
    console.log('[CRON] Server is live.')
    startTemporalWorker()
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
