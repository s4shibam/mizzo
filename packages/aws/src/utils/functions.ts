import { type TS3GetKeyParams } from '../types/s3'
import { S3_DIRECTORIES } from './constants'

export const isS3Url = (url: string): boolean => {
  const s3UrlPattern =
    /^https?:\/\/[^/]+\.s3[.-][a-z0-9-]+\.amazonaws\.com\/.*/i

  return s3UrlPattern.test(url)
}

export const s3GetKey = (params: TS3GetKeyParams): string | null => {
  if ('s3Key' in params) {
    return params.s3Key
  }

  if ('s3Url' in params) {
    try {
      if (!isS3Url(params.s3Url)) {
        throw new Error('Invalid URL provided')
      }

      const parsedUrl = new URL(params.s3Url)
      return parsedUrl.pathname.substring(1)
    } catch {
      return null
    }
  }

  if (!params.directory) {
    return params.fileName
  }

  return `${S3_DIRECTORIES[params.directory]}/${params.fileName}`
}
