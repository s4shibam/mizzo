import type { TStatus } from '.'

import type { Track } from './track'
import type { User } from './user'

export type Playlist = {
  id: 'search-results' | 'liked-songs' | 'my-collabs' | 'my-uploads' | string
  ownerId?: string
  name: string
  description?: string | null
  status?: TStatus
  likes?: number
  isPublic?: boolean
  posterKey?: string | null
  createdAt?: string
  updatedAt?: string
  owner?: Partial<User>
  playlistTracks?: Track[]
  _count?: Playlist_Count
}

export type Playlist_Count = {
  playlistTracks: number
  likedPlaylist: number
}
