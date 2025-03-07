import fsp from 'fs/promises'
import path from 'path'
import { cwd } from 'process'

import { s3DownloadObject } from '@mizzo/aws'

import { VALID_EXT_NAMES } from './constants'
import { env } from './env'
import {
  cleanupWorkDir,
  createHLSContent,
  updateTrackStatus,
  uploadAllFiles
} from './utils'

const main = async () => {
  const workDir = cwd()
  const rawFileWithExtName = env.awsS3TrackKey.split('/')[1]
  const [trackId, extName] = rawFileWithExtName.split('.')

  if (!trackId || !extName) {
    console.error(
      `Invalid track file name (Expected: <trackId>.<extName>) Received: ${rawFileWithExtName}`
    )

    throw new Error('KNOWN_ERROR')
  }

  if (!VALID_EXT_NAMES.includes(extName)) {
    console.error(
      `Invalid track file extension: ${extName} (Expected: ${VALID_EXT_NAMES.join(', ')})`
    )

    throw new Error('KNOWN_ERROR')
  }

  try {
    await updateTrackStatus({ trackId, status: 'PROCESSING' })

    const output = await s3DownloadObject({
      s3Key: env.awsS3TrackKey,
      bucket: env.awsS3Bucket
    }).catch((error) => {
      console.error('Error downloading track file:', error)

      throw new Error('KNOWN_ERROR')
    })

    if (!output.Body) {
      console.error('Track file has no content')

      throw new Error('KNOWN_ERROR')
    }

    const responseBuffer = await output.Body.transformToByteArray()

    await fsp.writeFile(rawFileWithExtName, responseBuffer)

    const rawTrackPath = path.resolve(rawFileWithExtName)

    console.info(
      `Track file downloaded to "${rawTrackPath}". Now transcoding...`
    )

    await createHLSContent({ rawTrackPath, workDir })

    await uploadAllFiles({ workDir, trackId })

    await updateTrackStatus({ trackId, status: 'REVIEWING' })
  } catch (error) {
    if (error instanceof Error && error.message !== 'KNOWN_ERROR') {
      console.error('UNKNOWN_ERROR', error, '\n\n')
    }

    await updateTrackStatus({ trackId, status: 'FAILED' })
  } finally {
    await cleanupWorkDir(workDir)
    process.exit()
  }
}

main().catch((error) => {
  console.error('Error in main:', error, '\n\n')
  process.exit(1)
})
