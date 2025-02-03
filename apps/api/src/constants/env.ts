type TEnv = {
  jwtSecret: string | 'NA'
  apiSecretKey: string | 'NA'
}

export const env: TEnv = {
  jwtSecret: process.env.JWT_SECRET || 'NA',
  apiSecretKey: process.env.API_SECRET_KEY || 'NA'
}
