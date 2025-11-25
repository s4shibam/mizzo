import axios from 'axios'
import ISO6391 from 'iso-639-1'

import { WEB_URL } from '@mizzo/utils'

import { env } from '@/constants/env'
import {
  HOME_PAGE_BANNER_IMAGE_CODES,
  TRENDING_SEARCHES
} from '@/constants/index'

import type { TStatus } from '../types'

export const formatNumber = (value: number) => {
  const numberFormatter = new Intl.NumberFormat('en-US')
  return numberFormatter.format(value)
}

export const formatNumberCompact = (value: number) => {
  const compactNumberFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2
  })

  return compactNumberFormatter.format(value)
}

export const getLanguageList = (): string[] => {
  return ISO6391.getAllNames()
}

export const pluralize = (
  count: number = 0,
  singular: string,
  plural?: string
) => {
  if (count === 0) {
    return `No ${plural ?? `${singular}s`}`
  }

  if (count === 1) {
    return `${count} ${singular}`
  }

  return `${count} ${plural ?? `${singular}s`}`
}

export const formatBytes = (
  bytes: number,
  toUnit: 'B' | 'KB' | 'MB' | 'GB'
) => {
  const units = ['B', 'KB', 'MB', 'GB']
  const index = units.indexOf(toUnit)
  if (index === -1) {
    return 'NA'
  }

  return (bytes / Math.pow(1024, index)).toFixed(2) + ' ' + units[index]
}

export const httpUrl = (url = ''): string | undefined => {
  if (!url) {
    return undefined
  } else if (url?.startsWith('https://')) {
    return url
  } else {
    return 'https://' + url
  }
}

export const getStatusInfo = (
  status?: TStatus
): { text: string; color: string } => {
  if (!status) return { text: 'Unknown', color: 'default' }

  const statusMap: Record<TStatus, { text: string; color: string }> = {
    PENDING: { text: 'Pending', color: 'blue' },
    PROCESSING: { text: 'Processing', color: 'gold' },
    FAILED: { text: 'Failed', color: 'red' },
    REVIEWING: { text: 'Reviewing', color: 'orange' },
    PUBLISHED: { text: 'Published', color: 'green' },
    BLOCKED: { text: 'Blocked', color: 'red' }
  }

  return statusMap[status] || { text: 'Unknown', color: 'default' }
}

export const getShareableLinkToCopy = (
  urlType: 'track' | 'artist' | 'playlist',
  id: string
) => {
  let url = WEB_URL
  if (urlType === 'track') {
    url += `/track/${id}`
  } else if (urlType === 'artist') {
    url += `/artist/${id}`
  } else if (urlType === 'playlist') {
    url += `/playlist/${id}`
  }

  return url
}

export const getBannerImage = () => {
  return `https://images.unsplash.com/photo-${
    HOME_PAGE_BANNER_IMAGE_CODES?.[
      Math.floor(Math.random() * HOME_PAGE_BANNER_IMAGE_CODES?.length)
    ]
  }?q=80&w=1500`
}

export const getTrendingSearches = () => {
  const shuffled = TRENDING_SEARCHES.sort(() => 0.5 - Math.random()).slice(
    0,
    10
  )

  return shuffled
}

export const isSameCuid = (cuid1?: string, cuid2?: string) => {
  if (!cuid1 || !cuid2) return false

  return cuid1 === cuid2
}

export const s3GetUrlFromKey = (key?: string | null) => {
  if (!key) return undefined

  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key
  }

  if (env.awsS3BaseUrl === 'NA') {
    return undefined
  }

  return `${env.awsS3BaseUrl}/${key}`
}

export const s3UploadFileViaPresignedUrl = async (
  file: File,
  uploadUrl: string
): Promise<string> => {
  try {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type
      }
    })

    // Extract the S3 URL from the presigned URL (removing query parameters)
    const s3Url = uploadUrl.split('?')[0]
    return s3Url
  } catch (error) {
    console.error('Error uploading to S3:', error)
    throw new Error('Failed to upload file')
  }
}
