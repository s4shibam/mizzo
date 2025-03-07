import fsp from 'fs/promises'
import path from 'path'

import axios from 'axios'
import ffmpeg from 'fluent-ffmpeg'

import { S3_DIRECTORIES, s3UploadObject } from '@mizzo/aws'

import {
  MASTER_PLAYLIST_CONTENT,
  MASTER_PLAYLIST_NAME,
  TRANSCODING_OPTIONS
} from './constants'
import { env } from './env'

type TCreateHLSVariantParams = {
  workDir: string
  rawTrackPath: string
  option: {
    quality: string
    bitrate: number
    duration: number
  }
}

export const createHLSContent = async ({
  rawTrackPath,
  workDir
}: {
  rawTrackPath: string
  workDir: string
}): Promise<void> => {
  const variantPromises = TRANSCODING_OPTIONS.map((option) =>
    createHLSVariant({
      workDir,
      rawTrackPath,
      option
    })
  )

  const masterPlaylistPromise = fsp.writeFile(
    path.join(workDir, MASTER_PLAYLIST_NAME),
    MASTER_PLAYLIST_CONTENT
  )

  await Promise.all([...variantPromises, masterPlaylistPromise])
}

const createHLSVariant = async ({
  workDir,
  rawTrackPath,
  option
}: TCreateHLSVariantParams): Promise<void> => {
  const { quality, bitrate, duration } = option

  const segmentPattern = path.join(workDir, `${quality}_%03d.aac`)
  const playlistPath = path.join(workDir, `${quality}.m3u8`)

  return new Promise((resolve, reject) => {
    ffmpeg(rawTrackPath)
      .toFormat('hls')
      .addOptions([
        '-map 0:a',
        `-b:a ${bitrate}k`,
        '-ac 2',
        '-ar 44100',
        `-hls_time ${duration}`,
        '-hls_playlist_type vod',
        `-hls_segment_filename ${segmentPattern}`
      ])
      .output(playlistPath)
      .on('start', () => {
        console.info(`Started transcoding variant: ${quality}`)
      })
      .on('end', () => {
        console.info(`Completed transcoding variant: ${quality}`)
        resolve()
      })
      .on('error', (err) => {
        console.error(`Error transcoding variant: ${quality}`, err)
        reject(err)
      })
      .run()
  })
}

export const uploadAllFiles = async ({
  workDir,
  trackId
}: {
  workDir: string
  trackId: string
}): Promise<void> => {
  const files = await fsp.readdir(workDir)
  const mediaFileNames = files.filter(
    (file) => file.endsWith('.m3u8') || file.endsWith('.aac')
  )

  const uploadPromises = mediaFileNames.map(async (fileName) => {
    const filePath = path.join(workDir, fileName)
    const fileBuffer = await fsp.readFile(filePath)
    const s3Key = `${S3_DIRECTORIES['transcoded-track']}/${trackId}/${fileName}`

    await s3UploadObject({
      bucket: env.awsS3Bucket,
      s3Key,
      buffer: fileBuffer,
      contentType: fileName.endsWith('.m3u8')
        ? 'application/x-mpegURL'
        : 'audio/aac'
    }).catch((error) => {
      console.error(`Error uploading hls file: ${fileName}`, error)

      throw new Error('KNOWN_ERROR')
    })

    console.info(`Uploaded: ${fileName}`)
  })

  await Promise.all(uploadPromises)
}

export const cleanupWorkDir = async (workDir: string): Promise<void> => {
  try {
    await fsp.rm(workDir, { recursive: true, force: true })
    console.info(`Cleaned up working directory "${workDir}".`)
  } catch (error) {
    console.error(`Error cleaning up work directory "${workDir}":`, error)
  }
}

type TUpdateTrackStatusParams = {
  trackId: string
  status: 'PROCESSING' | 'REVIEWING' | 'FAILED'
}

export const updateTrackStatus = async ({
  trackId,
  status
}: TUpdateTrackStatusParams) => {
  if (env.apiUrl === 'NA' || env.apiSecretKey === 'NA') {
    console.warn(
      'API url or secret key not configured, skipping status update.'
    )

    return
  }

  console.info(`Track (${trackId}) status updating to ${status}...`)

  try {
    const response = await axios.put(
      `${env.apiUrl}/secret/track-status/${trackId}`,
      { status },
      { headers: { Authorization: `Bearer ${env.apiSecretKey}` } }
    )

    if (response.status !== 200) {
      console.error(
        `Track (${trackId}) status update failed: ${response.data.message}`
      )

      throw new Error('KNOWN_ERROR')
    }

    console.info(`Track (${trackId}) status updated to ${status}.`)
  } catch (error) {
    console.error(`Track (${trackId}) status update failed:`, error)
    throw error
  }
}
