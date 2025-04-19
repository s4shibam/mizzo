import cron from 'node-cron'

import {
  ecsRunTask,
  sqsDeleteMessage,
  sqsGetMessages,
  type TS3Event
} from '@mizzo/aws'

import { shouldCreateNewProcessingTask } from '../utils'

const sqsConsumer = async () => {
  console.log('[SQS]', new Date().toLocaleString())

  try {
    const messages = await sqsGetMessages()

    if (messages.length === 0) {
      console.error('No messages found')
      return
    }

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
          console.error('Error parsing message body:', error)
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

        const isNewTaskAllowed = await shouldCreateNewProcessingTask()

        if (!isNewTaskAllowed) {
          console.log('[SQS] No new processing task created.')
          return
        }

        if ('Records' in s3Event) {
          for (const record of s3Event.Records) {
            const { s3 } = record

            const s3BucketName = s3.bucket.name
            const s3Key = s3.object.key // Format: tracks/trackId.mp3

            console.log('[SQS] Creating new task', {
              s3BucketName,
              s3Key
            })

            if (s3Key.split('/').length === 2) {
              await ecsRunTask({
                bucketName: s3BucketName,
                key: s3Key
              })
            }

            await sqsDeleteMessage(message)
          }
        }
      } catch (error) {
        console.error('[SQS] Error processing message:', error)
      }
    }
  } catch (error) {
    console.error('[SQS] Error consuming messages:', error)
  }
}

export const scheduleSqsConsumer = () => {
  cron.schedule('*/1 * * * *', async () => {
    await sqsConsumer()
  })
}
