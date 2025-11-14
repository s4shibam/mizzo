type TEnv = {
  apiUrl: string | 'NA'
  apiSecretKey: string | 'NA'
  enableSqsConsumer: boolean
}

export const env: TEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'NA',
  apiSecretKey: process.env.API_SECRET_KEY || 'NA',
  enableSqsConsumer: process.env.ENABLE_SQS_CONSUMER === 'true'
}
