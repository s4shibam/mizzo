import cron from 'node-cron'

import {
  env as awsEnv,
  ecsRunTask,
  sqsDeleteMessage,
  sqsGetMessages,
  type TS3Event
} from '@mizzo/aws'

import { env } from '../env'
import { getAvailableProcessingSlots } from '../utils'

const MAX_MESSAGES_PER_POLL = 10

const getQueueName = (queueUrl: string): string => {
  if (queueUrl === 'NA') {
    return 'NA'
  }

  const parts = queueUrl.split('/')
  return parts[parts.length - 1] || queueUrl
}

const sqsConsumer = async () => {
  console.log('[SQS]', new Date().toLocaleString())

  try {
    const availableSlots = await getAvailableProcessingSlots()

    if (availableSlots <= 0) {
      console.log('[SQS] No available slots')
      return
    }

    const messages = await sqsGetMessages({
      maxMessages: Math.min(availableSlots, MAX_MESSAGES_PER_POLL)
    })

    if (messages.length === 0) {
      console.log('[SQS] No messages found')
      return
    }

    console.log(`[SQS] Processing ${messages.length} message(s)`)

    let tasksCreated = 0

    for (const message of messages) {
      try {
        const { MessageId, Body } = message

        if (!MessageId || !Body) {
          continue
        }

        let s3Event: TS3Event

        try {
          s3Event = JSON.parse(Body) as TS3Event
        } catch (error) {
          console.error('[SQS] Failed to parse message:', error)
          await sqsDeleteMessage(message)
          continue
        }

        if (
          'Service' in s3Event &&
          'Event' in s3Event &&
          s3Event.Event === 's3.TestEvent'
        ) {
          await sqsDeleteMessage(message)
          continue
        }

        if (tasksCreated >= availableSlots) {
          console.log('[SQS] Capacity reached, stopping')
          break
        }

        if ('Records' in s3Event) {
          for (const record of s3Event.Records) {
            const { s3 } = record

            const s3BucketName = s3.bucket.name
            const s3Key = s3.object.key // Format: tracks/trackId.mp3

            if (s3Key.split('/').length !== 2) {
              console.warn('[SQS] Invalid S3 key format:', s3Key)
              await sqsDeleteMessage(message)
              continue
            }

            console.log('[SQS] Creating task', { s3BucketName, s3Key })

            try {
              await ecsRunTask({ bucketName: s3BucketName, key: s3Key })
              tasksCreated++
              await sqsDeleteMessage(message)
            } catch (error) {
              console.error('[SQS] Failed to create task:', error)
            }
          }
        } else {
          await sqsDeleteMessage(message)
        }
      } catch (error) {
        console.error('[SQS] Error processing message:', error)
      }
    }

    console.log(`[SQS] Created ${tasksCreated} task(s)`)
  } catch (error) {
    console.error('[SQS] Error consuming messages:', error)
  }
}

export const scheduleSqsConsumer = () => {
  if (!env.enableSqsConsumer) {
    console.warn('[SQS] Consumer disabled by feature flag')
    return
  }

  const queueName = getQueueName(awsEnv.awsSqsQueueUrl)
  console.log('[SQS] Connected to queue:', queueName)

  cron.schedule('*/15 * * * * *', async () => {
    await sqsConsumer()
  })
}
