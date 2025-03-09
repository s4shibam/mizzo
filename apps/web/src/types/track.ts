import type { TStatus } from '.'

import { type Artist } from './user'

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
  lyrics: string
  status: TStatus
  posterKey: string
  trackKey: string
  createdAt?: Date
  updatedAt: Date
  primaryArtist: Artist
  secondaryArtists: Artist[]
}
