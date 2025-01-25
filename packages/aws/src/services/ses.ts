import {
  SendEmailCommand,
  SendEmailCommandOutput,
  SESClient
} from '@aws-sdk/client-ses'

import { TSendEmailParams } from '../types/ses'
import { env } from '../utils/env'

const sesClient = new SESClient({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey
  }
})

export const sesSendEmail = async (
  params: TSendEmailParams
): Promise<SendEmailCommandOutput> => {
  try {
    const fromAddress = params.fromAddress || env.awsSesSenderEmail

    if (fromAddress === 'NA') {
      throw new Error('SES sender email not configured')
    }

    const command = new SendEmailCommand({
      Source: fromAddress,
      Destination: {
        ToAddresses: params.toAddresses
      },
      Message: {
        Subject: {
          Data: params.content.subject
        },
        Body: {
          Html: {
            Data: params.content.htmlBody
          },
          ...(params.content.textBody && {
            Text: {
              Data: params.content.textBody
            }
          })
        }
      }
    })

    const result = await sesClient.send(command)
    return result
  } catch (error) {
    console.error('Error sending email via SES:', error)
    throw new Error('Failed to send email')
  }
}
