import { Request } from 'express'

import bcryptjs from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'

import { S3_DIRECTORIES, TS3Directory } from '@mizzo/aws'
import type { Status } from '@mizzo/prisma'

import { env } from '../constants/env'
import { throwError } from '../utils/throw-error'

type TDeviceInfo = {
  browser: string
  os: string
  deviceType: string
  userAgent: string
}

export const extractUserAgentInfo = (req: Request): TDeviceInfo => {
  const userAgent = req.headers['user-agent'] || 'unknown'
  const isMobile = /mobile/i.test(userAgent)
  const isTablet = /tablet|ipad/i.test(userAgent)
  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'

  const browserInfo =
    userAgent.match(
      /(chrome|safari|firefox|msie|trident|edge|opera)\/?\s*(\d+)/i
    ) || []
  const browser = browserInfo[1] || 'unknown'
  const browserVersion = browserInfo[2] || ''

  const osInfo =
    userAgent.match(
      /(mac|windows|linux|android|ios|iphone|ipad)(?:\s+\w+\s+(\d+[\d._]*)|[\s;]+(\d+[\d._]*))?/i
    ) || []
  const os = osInfo[1] || 'unknown'
  const osVersion = osInfo[2] || osInfo[3] || ''

  return {
    browser: `${browser} ${browserVersion}`.trim(),
    os: `${os} ${osVersion}`.trim(),
    deviceType,
    userAgent
  }
}

export const getStatusText = ({ status }: { status: Status }) => {
  const statusMap: Record<Status, string> = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    FAILED: 'Failed',
    REVIEWING: 'Reviewing',
    PUBLISHED: 'Published',
    BLOCKED: 'Blocked'
  }

  return statusMap[status] || 'Unknown'
}

export const clearString = (str = '') => {
  return str?.trim()?.replace(/\s+/g, ' ')
}

export const getFullTextSearchQuery = (str = '') => {
  const cleanedStr = str?.trim()?.replace(/\s+/g, ' ')

  if (!cleanedStr) {
    return ''
  }

  const cleanedStrArray = [cleanedStr, ...cleanedStr.split(' ')]
  const deduplicatedStrArray = [...new Set(cleanedStrArray)]

  return deduplicatedStrArray?.join(' | ')
}

export const generateTimeInMs = ({
  hour = 0,
  minute = 0,
  second = 0
}: {
  hour?: number
  minute?: number
  second?: number
}) => {
  return hour * 3600000 + minute * 60000 + second * 1000
}

export const generateOtp = () => {
  const otpLength = 6
  const characters = '0123456789'

  let otp = ''

  for (let i = 0; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    otp += characters[randomIndex]
  }

  return otp
}

export const generateToken = ({
  obj,
  expiresIn = '1d'
}: {
  obj: object
  expiresIn: SignOptions['expiresIn']
}) => {
  return jwt.sign(obj, env.jwtSecret, {
    expiresIn
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.jwtSecret)
}

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, 10)
}

export const comparePassword = async ({
  password,
  hashedPassword
}: {
  password: string
  hashedPassword: string
}) => {
  return await bcryptjs.compare(password, hashedPassword)
}

export const excludeKeys = (obj: object, keys: string[] = []) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  )
}

export const isExpired = ({
  timestamp,
  expirationTime
}: {
  timestamp: Date
  expirationTime: number
}) => {
  const currentTime = new Date()
  const timeDifference = currentTime.getTime() - timestamp.getTime()
  return timeDifference > expirationTime
}

/*
  Render comma separated, single spaced, trimmed array of tags
  Example: "pop,  rock,   jazz  " -> "pop, rock, jazz"
  Example: "HIP HOP,    rap,ELECTRONIC" -> "hip hop, rap, electronic" 
*/
export const formatTags = (tags: string[] = []) => {
  if (!tags.length) {
    return undefined
  }

  return tags
    .map((tag) => tag.toLowerCase().trim().replace(/\s+/g, ' ')) // Convert to lowercase and trim each tag and replace multiple spaces with a single space
    .filter((tag) => tag !== '') // Remove empty tags
    .join(', ') // Join the tags with a comma
}

export const isS3Url = (url: string): boolean => {
  // Regex to check if the URL is an S3 URL
  const s3UrlPattern =
    /^https?:\/\/[^/]+\.s3[.-][a-z0-9-]+\.amazonaws\.com\/.*/i
  return s3UrlPattern.test(url)
}

type TGetS3KeyParams =
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

export const getS3Key = (params: TGetS3KeyParams): string | null => {
  if ('s3Key' in params) {
    return params.s3Key
  }

  if ('s3Url' in params) {
    try {
      if (!isS3Url(params.s3Url)) {
        throwError('Invalid URL provided', 400)
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
