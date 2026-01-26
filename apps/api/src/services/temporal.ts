import { Client, Connection } from '@temporalio/client'

import { env } from '../constants/env'
import { throwError } from '../utils/throw-error'

export const getTemporalClient = async (): Promise<Client> => {
  if (!env.enableTemporal) {
    throwError('Temporal feature is disabled', 500)
  }

  if (
    env.temporalApiKey === 'NA' ||
    env.temporalAddress === 'NA' ||
    env.temporalNamespace === 'NA'
  ) {
    throwError('Temporal Cloud configuration missing', 500)
  }

  const connection = await Connection.connect({
    address: env.temporalAddress,
    tls: {},
    metadata: {
      authorization: `Bearer ${env.temporalApiKey}`
    }
  })

  const client = new Client({
    connection,
    namespace: env.temporalNamespace
  })

  return client
}

type TTrackLiveLyricWorkflowArgs = {
  trackId: string
  audioS3Key: string
  duration: number
  title: string
  language: string
}

export const startTrackLiveLyricWorkflow = async (
  args: TTrackLiveLyricWorkflowArgs,
  workflowId: string
) => {
  const temporal = await getTemporalClient()

  await temporal.workflow.start('trackLiveLyricWorkflow', {
    taskQueue: 'track-live-lyric',
    workflowId,
    args: [args]
  })
}
