import type { Status } from '@mizzo/prisma'

export const SIZES_IN_BYTES = {
  MB_1: 1048576,
  MB_10: 10485760
}

export const NON_PREMIUM_USER_CONSTRAINTS = {
  PLAYLIST_LIMIT: 5,
  PER_PLAYLIST_TRACK_LIMIT: 15
}

export const STATUS_LIST: Status[] = [
  'PENDING',
  'PROCESSING',
  'FAILED',
  'REVIEWING',
  'PUBLISHED',
  'BLOCKED'
]
