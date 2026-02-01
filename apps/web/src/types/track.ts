import type { TStatus } from '.'

import { type Artist } from './user'

export type Track_Count = {
  likedTrack: number
  playlistTracks: number
}

export type TLiveLyricStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

export type TTrackLiveLyric = {
  status: TLiveLyricStatus
  content: {
    lines: Array<{ startTime: number; endTime: number; text: string }>
  } | null
  workflowId?: string | null
  errorMessage?: string | null
}

export type Track = {
  id: string
  primaryArtistId: string
  title: string
  language: string
  isPublic: boolean
  likes: number
  listens: number
  duration: number
  tags: string
  status: TStatus
  liveLyric?: TTrackLiveLyric
  posterKey: string
  trackKey: string
  createdAt?: Date
  updatedAt: Date
  primaryArtist: Artist
  secondaryArtists: Artist[]
  _count?: Track_Count
}
