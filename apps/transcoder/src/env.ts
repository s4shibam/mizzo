type TEnv = {
  apiUrl: string | 'NA'
  apiSecretKey: string | 'NA'
  awsRegion: string | 'NA'
  awsS3Bucket: string | 'NA'
  awsS3TrackKey: string | 'NA'
  awsAccessKeyId: string | 'NA'
  awsSecretAccessKey: string | 'NA'
}

const env: TEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'NA',
  apiSecretKey: process.env.API_SECRET_KEY || 'NA',
  awsRegion: process.env.AWS_REGION || 'NA',
  awsS3Bucket: process.env.AWS_S3_BUCKET || 'NA',
  awsS3TrackKey: process.env.AWS_S3_TRACK_KEY || 'NA',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || 'NA',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'NA'
}

export { env }
