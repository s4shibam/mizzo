import axios from 'axios'

import { env } from './env'

const MAX_PROCESSING_TRACK_COUNT = 2

export const shouldCreateNewProcessingTask = async () => {
  if (env.apiUrl === 'NA' || env.apiSecretKey === 'NA') {
    console.warn(
      'API url or secret key not configured, skipping status update.'
    )

    return false
  }

  try {
    const response = await axios.get<{
      message: string
      data: number
    }>(`${env.apiUrl}/secret/processing-track-count`, {
      headers: { Authorization: `Bearer ${env.apiSecretKey}` }
    })

    if (
      response.status === 200 &&
      response.data.data < MAX_PROCESSING_TRACK_COUNT
    ) {
      return true
    }

    return false
  } catch (error) {
    console.error(`Failed to get processing track count:`, error)
    return false
  }
}
