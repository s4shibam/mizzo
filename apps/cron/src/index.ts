import { NativeConnection, Worker } from '@temporalio/worker'

import { env } from './env'
import { scheduleSqsConsumer } from './jobs'
import * as activities from './temporal/activities'
import { MAX_CONCURRENT_AI_ACTIVITIES } from './utils'

const startTemporalWorker = async () => {
  if (!env.enableTemporal) {
    console.warn('[CRON] Temporal worker disabled by feature flag')
    return
  }

  if (
    env.temporalApiKey === 'NA' ||
    env.temporalAddress === 'NA' ||
    env.temporalNamespace === 'NA'
  ) {
    console.warn('[CRON] Temporal configuration missing, skipping worker')
    return
  }

  const connection = await NativeConnection.connect({
    address: env.temporalAddress,
    tls: true,
    metadata: {
      authorization: `Bearer ${env.temporalApiKey}`
    }
  })

  const worker = await Worker.create({
    connection,
    namespace: env.temporalNamespace,
    taskQueue: 'track-live-lyric',
    workflowsPath: require.resolve('./temporal/workflows'),
    activities,
    maxConcurrentActivityTaskExecutions: MAX_CONCURRENT_AI_ACTIVITIES
  })

  await worker.run()
}

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
