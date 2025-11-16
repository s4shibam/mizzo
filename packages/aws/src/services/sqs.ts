import {
  DeleteMessageCommand,
  Message,
  PurgeQueueCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient
} from '@aws-sdk/client-sqs'

import { env } from '../utils/env'

const sqsClient = new SQSClient({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey
  }
})

export const sqsGetMessages = async (): Promise<Message[]> => {
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: env.awsSqsQueueUrl,
      MaxNumberOfMessages: 1,
      WaitTimeSeconds: 20
    })

    const response = await sqsClient.send(command)

    return response.Messages ?? []
  } catch (error) {
    console.error('Error getting messages from SQS', error)
    return []
  }
}

export const sqsDeleteMessage = async (message: Message) => {
  try {
    const command = new DeleteMessageCommand({
      QueueUrl: env.awsSqsQueueUrl,
      ReceiptHandle: message.ReceiptHandle
    })

    await sqsClient.send(command)

    return true
  } catch (error) {
    console.error('Error deleting message from SQS', error)
    return false
  }
}

export const sqsPurgeQueue = async (): Promise<boolean> => {
  try {
    const command = new PurgeQueueCommand({
      QueueUrl: env.awsSqsQueueUrl
    })

    await sqsClient.send(command)

    return true
  } catch (error) {
    console.error('Error purging SQS queue', error)
    return false
  }
}

export const sqsSendMessage = async (
  messageBody: Record<string, unknown>
): Promise<boolean> => {
  try {
    const command = new SendMessageCommand({
      QueueUrl: env.awsSqsQueueUrl,
      MessageBody: JSON.stringify(messageBody)
    })

    await sqsClient.send(command)

    return true
  } catch (error) {
    console.error('Error sending message to SQS', error)
    return false
  }
}

type TBuildS3EventBridgeMessageParams = {
  bucketName: string
  key: string
}

export const sqsBuildS3EventBridgeMessage = ({
  bucketName,
  key
}: TBuildS3EventBridgeMessageParams) => {
  return {
    Records: [
      {
        eventTime: new Date().toISOString(),
        s3: {
          bucket: {
            name: bucketName
          },
          object: {
            key
          }
        }
      }
    ]
  }
}
