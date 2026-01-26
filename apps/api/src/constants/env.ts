type TEnv = {
  jwtSecret: string | 'NA'
  apiSecretKey: string | 'NA'
  temporalApiKey: string | 'NA'
  temporalNamespace: string | 'NA'
  temporalAddress: string | 'NA'
  enableTemporal: boolean
}

export const env: TEnv = {
  jwtSecret: process.env.JWT_SECRET || 'NA',
  apiSecretKey: process.env.API_SECRET_KEY || 'NA',
  temporalApiKey: process.env.TEMPORAL_API_KEY || 'NA',
  temporalNamespace: process.env.TEMPORAL_NAMESPACE || 'NA',
  temporalAddress: process.env.TEMPORAL_ADDRESS || 'NA',
  enableTemporal: process.env.ENABLE_TEMPORAL === 'true'
}
