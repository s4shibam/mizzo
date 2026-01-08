import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

// Local storage keys
const STORAGE_KEYS = {
  ACTIVE_TRACK: 'mizzo_player_active_track',
  ACTIVE_PLAYLIST: 'mizzo_player_active_playlist',
  PLAYBACK_POSITION: 'mizzo_player_playback_position'
} as const

// Types for stored data
export type StoredTrack = Track

export type StoredPlaylist = Playlist

export type StoredPlaybackPosition = {
  trackId: string
  currentTime: number
  timestamp: number 
}

export class PlayerStorage {
  static saveTrack(track: Track | undefined): void {
    if (typeof window === 'undefined') return

    if (!track) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TRACK)
      return
    }

    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TRACK, JSON.stringify(track))
    } catch (error) {
      console.error('Failed to save track to storage:', error)
    }
  }

  static loadTrack(): Track | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_TRACK)
      if (!stored) return null

      return JSON.parse(stored) as Track
    } catch (error) {
      console.error('Failed to load track from storage:', error)
      return null
    }
  }

  static savePlaylist(playlist: Playlist | undefined): void {
    if (typeof window === 'undefined') return

    if (!playlist) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAYLIST)
      return
    }

    try {
      localStorage.setItem(
        STORAGE_KEYS.ACTIVE_PLAYLIST,
        JSON.stringify(playlist)
      )
    } catch (error) {
      console.error('Failed to save playlist to storage:', error)
    }
  }

  static loadPlaylist(): Playlist | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_PLAYLIST)
      if (!stored) return null

      return JSON.parse(stored) as Playlist
    } catch (error) {
      console.error('Failed to load playlist from storage:', error)
      return null
    }
  }

  static savePlaybackPosition(trackId: string, currentTime: number): void {
    if (typeof window === 'undefined') return

    try {
      const position: StoredPlaybackPosition = {
        trackId,
        currentTime,
        timestamp: Date.now()
      }
      localStorage.setItem(
        STORAGE_KEYS.PLAYBACK_POSITION,
        JSON.stringify(position)
      )
    } catch (error) {
      console.error('Failed to save playback position to storage:', error)
    }
  }

  static loadPlaybackPosition(): StoredPlaybackPosition | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLAYBACK_POSITION)
      if (!stored) return null

      const position = JSON.parse(stored) as StoredPlaybackPosition

      // Invalidate if older than 7 days
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
      if (Date.now() - position.timestamp > sevenDaysInMs) {
        localStorage.removeItem(STORAGE_KEYS.PLAYBACK_POSITION)
        return null
      }

      return position
    } catch (error) {
      console.error('Failed to load playback position from storage:', error)
      return null
    }
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TRACK)
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_PLAYLIST)
      localStorage.removeItem(STORAGE_KEYS.PLAYBACK_POSITION)
    } catch (error) {
      console.error('Failed to clear player storage:', error)
    }
  }

  static hasStoredState(): boolean {
    if (typeof window === 'undefined') return false

    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_TRACK) !== null
    } catch (error) {
      console.error('Failed to check stored state:', error)
      return false
    }
  }
}
