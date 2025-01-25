import { S3_DIRECTORIES } from '../utils/constants'

export type TS3Directory = keyof typeof S3_DIRECTORIES

export type TBaseS3Params = {
  bucket?: string
} & TS3GetKeyParams

export type TUploadParams = TBaseS3Params & {
  buffer: Buffer
  contentType?: 'application/x-mpegURL' | 'audio/aac' | string
}

export type TDownloadParams = TBaseS3Params

export type TDeleteParams = TBaseS3Params

export type TGetPresignedUrlParams = TBaseS3Params & {
  fileSize?: number
  fileType?: string
  expiresIn?: number
}

export type TS3GetKeyParams =
  | {
      directory?: TS3Directory
      fileName: string
    }
  | {
      s3Key: string
    }
  | {
      s3Url: string
    }

/**
 * S3 Event
 * @ref import type { S3Event } from 'aws-lambda'
 */
export type TS3Event =
  | {
      Records: TS3EventRecord[]
    }
  | {
      Service: unknown // Note: Not sure what this is
      Event: 's3.TestEvent' | string
    }

export type TS3EventRecord = {
  s3: {
    s3SchemaVersion: string
    configurationId: string
    bucket: {
      name: string
      ownerIdentity: {
        principalId: string
      }
      arn: string
    }
    object: {
      key: string
      size: number
      eTag: string
      versionId?: string | undefined
      sequencer: string
    }
  }
}
