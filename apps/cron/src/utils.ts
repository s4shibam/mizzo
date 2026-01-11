import axios from 'axios'

import { env } from './env'

const MAX_PROCESSING_TRACK_COUNT = 10

export const getAvailableProcessingSlots = async () => {
  if (env.apiUrl === 'NA' || env.apiSecretKey === 'NA') {
    console.warn('API url or secret key not configured, returning 0 slots')
    return 0
  }

  try {
    const response = await axios.get<{ data: number }>(
      `${env.apiUrl}/secret/processing-track-count`,
      {
        headers: { Authorization: `Bearer ${env.apiSecretKey}` },
        timeout: 5000
      }
    )

    const currentCount = response.data.data
    return Math.max(0, MAX_PROCESSING_TRACK_COUNT - currentCount)
  } catch (error) {
    console.error('Failed to get processing track count:', error)
    return 0
  }
}
