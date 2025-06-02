import { TNodeEnv } from '@mizzo/utils'

type TEnv = {
  nodeEnv: TNodeEnv
  nextAuthUrl: string | 'NA'
  nextAuthSecret: string | 'NA'
  awsS3BaseUrl: string | 'NA'
}

export const env: TEnv = {
  nodeEnv: (process.env.NODE_ENV as TEnv['nodeEnv']) || 'NA',
  nextAuthUrl: process.env.NEXTAUTH_URL || 'NA',
  nextAuthSecret: process.env.NEXTAUTH_SECRET || 'NA',
  awsS3BaseUrl: process.env.NEXT_PUBLIC_AWS_S3_BASE_URL || 'NA'
}
