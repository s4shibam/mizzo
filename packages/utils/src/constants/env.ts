type TEnv = {
  awsS3BaseUrl: string | 'NA'
  enableProfanityCheck: boolean
}

export const env: TEnv = {
  awsS3BaseUrl: process.env.AWS_S3_BASE_URL || 'NA',
  enableProfanityCheck: process.env.ENABLE_PROFANITY_CHECK === 'true'
}
