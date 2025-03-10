'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

import { HlsPlayer } from '@/components/hls-player'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

type PlayerContextValue = {
  activeTrack: Track | undefined
  setActiveTrack: (activeTrack: Track | undefined) => void
  activePlaylist: Playlist | undefined
  setActivePlaylist: (playlist: Playlist | undefined) => void
  isActiveTrackPlaying: boolean
  setIsActiveTrackPlaying: (isActiveTrackPlaying: boolean) => void
}

const playerContext = createContext<PlayerContextValue | undefined>(undefined)

export const usePlayerContext = () => {
  const context = useContext(playerContext)
  if (context === undefined) {
    throw new Error('usePlayer must be used within a <PlayerProvider/>')
  }
  return context
}

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [activeTrack, setActiveTrack] = useState<Track>()
  const [activePlaylist, setActivePlaylist] = useState<Playlist>()
  const [isActiveTrackPlaying, setIsActiveTrackPlaying] = useState(false)

  return (
    <playerContext.Provider
      value={{
        activeTrack,
        setActiveTrack,
        activePlaylist,
        setActivePlaylist,
        isActiveTrackPlaying,
        setIsActiveTrackPlaying
      }}
    >
      {children}

      {activeTrack && <HlsPlayer />}
    </playerContext.Provider>
  )
}
