import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
  type GetObjectCommandOutput,
  type ObjectIdentifier
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import {
  TDeleteFolderParams,
  TDeleteParams,
  TGetPresignedUrlParams,
  TUploadParams,
  type TDownloadParams
} from '../types/s3'
import { S3_PRESIGNED_URL_EXPIRY } from '../utils/constants'
import { env } from '../utils/env'
import { s3GetKey } from '../utils/functions'

const s3Client = new S3Client({
  region: env.awsRegion,
  credentials: {
    accessKeyId: env.awsAccessKeyId,
    secretAccessKey: env.awsSecretAccessKey
  }
})

export const s3UploadObject = async (
  params: TUploadParams
): Promise<PutObjectCommandOutput> => {
  try {
    const key = s3GetKey(params)

    if (!key) {
      throw new Error('Invalid S3 key')
    }

    const command = new PutObjectCommand({
      Bucket: params.bucket ?? env.awsS3Bucket,
      Key: key,
      Body: params.buffer,
      ContentType: params.contentType
    })

    const result = await s3Client.send(command)

    return result
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw new Error('Failed to upload file')
  }
}

export const s3DownloadObject = async (
  params: TDownloadParams
): Promise<GetObjectCommandOutput> => {
  try {
    const key = s3GetKey(params)

    if (!key) {
      throw new Error('Invalid S3 key')
    }

    const command = new GetObjectCommand({
      Bucket: params.bucket ?? env.awsS3Bucket,
      Key: key
    })

    const result = await s3Client.send(command)

    return result
  } catch (error) {
    console.error('Error downloading from S3:', error)
    throw new Error('Failed to download file')
  }
}

export const s3DeleteObject = async (
  params: TDeleteParams
): Promise<DeleteObjectCommandOutput> => {
  try {
    const key = s3GetKey(params)

    if (!key) {
      throw new Error('Invalid S3 key')
    }

    const command = new DeleteObjectCommand({
      Bucket: params.bucket ?? env.awsS3Bucket,
      Key: key
    })

    const result = await s3Client.send(command)

    return result
  } catch (error) {
    console.error('Error deleting from S3:', error)
    throw new Error('Failed to delete file')
  }
}

export const s3PresignedUploadUrl = async (
  params: TGetPresignedUrlParams
): Promise<{ uploadUrl: string }> => {
  try {
    const key = s3GetKey(params)

    if (!key) {
      throw new Error('Invalid S3 key')
    }

    const command = new PutObjectCommand({
      Bucket: params.bucket ?? env.awsS3Bucket,
      Key: key,
      ContentType: params.fileType,
      ContentLength: params.fileSize
    })

    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: params.expiresIn ?? S3_PRESIGNED_URL_EXPIRY.seconds
    })

    return { uploadUrl }
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    throw new Error('Failed to generate presigned upload URL')
  }
}

export const s3PresignedDownloadUrl = async (
  params: TGetPresignedUrlParams
): Promise<{ downloadUrl: string }> => {
  try {
    const key = s3GetKey(params)

    if (!key) {
      throw new Error('Invalid S3 key')
    }

    const command = new GetObjectCommand({
      Bucket: params.bucket ?? env.awsS3Bucket,
      Key: key
    })

    const downloadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: params.expiresIn ?? S3_PRESIGNED_URL_EXPIRY.seconds
    })

    return { downloadUrl }
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    throw new Error('Failed to generate presigned download URL')
  }
}

export const s3DeleteFolder = async (
  params: TDeleteFolderParams
): Promise<{ deletedCount: number }> => {
  try {
    const bucket = params.bucket ?? env.awsS3Bucket
    const prefix = params.folderPath.endsWith('/')
      ? params.folderPath
      : `${params.folderPath}/`

    let deletedCount = 0
    let continuationToken: string | undefined

    do {
      const listCommand = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken
      })

      const listResponse = await s3Client.send(listCommand)

      if (!listResponse.Contents || listResponse.Contents.length === 0) {
        break
      }

      const objectsToDelete: ObjectIdentifier[] = listResponse.Contents.map(
        (obj) => ({
          Key: obj.Key
        })
      )

      const deleteCommand = new DeleteObjectsCommand({
        Bucket: bucket,
        Delete: {
          Objects: objectsToDelete,
          Quiet: false
        }
      })

      const deleteResponse = await s3Client.send(deleteCommand)

      deletedCount += deleteResponse.Deleted?.length ?? 0

      if (deleteResponse.Errors && deleteResponse.Errors.length > 0) {
        console.error('Some objects failed to delete:', deleteResponse.Errors)
      }

      continuationToken = listResponse.NextContinuationToken
    } while (continuationToken)

    return { deletedCount }
  } catch (error) {
    console.error('Error deleting folder from S3:', error)
    throw new Error('Failed to delete folder')
  }
}
