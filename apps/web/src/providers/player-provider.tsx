'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'

import { usePathname } from 'next/navigation'

import { HlsPlayer } from '@/components/hls-player'
import { PlayerStorage } from '@/lib/player-storage'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

type PlayerContextValue = {
  activeTrack: Track | undefined
  setActiveTrack: (activeTrack: Track | undefined) => void
  activePlaylist: Playlist | undefined
  setActivePlaylist: (playlist: Playlist | undefined) => void
  isActiveTrackPlaying: boolean
  setIsActiveTrackPlaying: (isActiveTrackPlaying: boolean) => void
  savedPosition: number | null
  setSavedPosition: (position: number | null) => void
}

const playerContext = createContext<PlayerContextValue | undefined>(undefined)

export const usePlayerContext = () => {
  const context = useContext(playerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a <PlayerProvider/>')
  }
  return context
}

const shouldShowPlayer = (pathname: string | null): boolean => {
  if (!pathname) return false

  if (pathname === '/') return false

  if (pathname.startsWith('/auth')) return false

  if (pathname.startsWith('/premium')) return false
  if (pathname.startsWith('/t&c')) return false

  return true
}

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [activeTrack, setActiveTrack] = useState<Track>()
  const [activePlaylist, setActivePlaylist] = useState<Playlist>()
  const [isActiveTrackPlaying, setIsActiveTrackPlaying] = useState(false)
  const [savedPosition, setSavedPosition] = useState<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const showPlayer = shouldShowPlayer(pathname)

  useEffect(() => {
    if (isInitialized) return

    // Only restore player state if we're on a route that should show the player
    if (!showPlayer) {
      setIsInitialized(true)
      return
    }

    const storedTrack = PlayerStorage.loadTrack()
    const storedPlaylist = PlayerStorage.loadPlaylist()
    const storedPosition = PlayerStorage.loadPlaybackPosition()

    if (storedTrack) {
      setActiveTrack(storedTrack)

      if (storedPlaylist) {
        setActivePlaylist(storedPlaylist)
      }

      if (storedPosition && storedPosition.trackId === storedTrack.id) {
        setSavedPosition(storedPosition.currentTime)
      }

      setIsActiveTrackPlaying(false)
    }

    setIsInitialized(true)
  }, [isInitialized, showPlayer])

  return (
    <playerContext.Provider
      value={{
        activeTrack,
        setActiveTrack,
        activePlaylist,
        setActivePlaylist,
        isActiveTrackPlaying,
        setIsActiveTrackPlaying,
        savedPosition,
        setSavedPosition
      }}
    >
      {children}

      {showPlayer && activeTrack && <HlsPlayer />}
    </playerContext.Provider>
  )
}
