import { env } from '../constants/env'

export const s3GetUrlFromKey = (key?: string | null) => {
  if (!key) {
    return undefined
  }

  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key
  }

  if (env.awsS3BaseUrl === 'NA') {
    return undefined
  }

  return `${env.awsS3BaseUrl}/${key}`
}
