type TEnv = {
  apiUrl: string | 'NA'
  apiSecretKey: string | 'NA'
  enableSqsConsumer: boolean
  enableTemporal: boolean
  temporalApiKey: string | 'NA'
  temporalNamespace: string | 'NA'
  temporalAddress: string | 'NA'
  googleGenerativeAiApiKey: string | 'NA'
}

export const env: TEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'NA',
  apiSecretKey: process.env.API_SECRET_KEY || 'NA',
  enableSqsConsumer: process.env.ENABLE_SQS_CONSUMER === 'true',
  enableTemporal: process.env.ENABLE_TEMPORAL === 'true',
  temporalApiKey: process.env.TEMPORAL_API_KEY || 'NA',
  temporalNamespace: process.env.TEMPORAL_NAMESPACE || 'NA',
  temporalAddress: process.env.TEMPORAL_ADDRESS || 'NA',
  googleGenerativeAiApiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || 'NA'
}
