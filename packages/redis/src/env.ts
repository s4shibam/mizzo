type TEnv = {
  enableRateLimit: boolean
  enableCaching: boolean
  shouldUseRedis: boolean
  redisUrl: string | 'NA'
}

export const env: TEnv = {
  enableRateLimit: process.env.ENABLE_RATE_LIMIT === 'true',
  enableCaching: process.env.ENABLE_CACHING === 'true',
  shouldUseRedis:
    process.env.ENABLE_RATE_LIMIT === 'true' ||
    process.env.ENABLE_CACHING === 'true',
  redisUrl: process.env.REDIS_URL || 'NA'
}
