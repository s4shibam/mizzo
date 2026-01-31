import { NativeConnection, Worker } from '@temporalio/worker'

import { env } from '../env'
import { MAX_CONCURRENT_AI_ACTIVITIES } from '../utils'
import * as activities from './activities'

export const startTemporalWorker = async () => {
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
    workflowsPath: require.resolve('./workflows'),
    activities,
    maxConcurrentActivityTaskExecutions: MAX_CONCURRENT_AI_ACTIVITIES
  })

  await worker.run()
}
