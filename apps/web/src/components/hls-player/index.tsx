'use client'

import { useEffect, useState } from 'react'

import { useIncrementTrackListeningCount } from '@/hooks/api/track'
import { useHlsPlayer } from '@/hooks/custom/use-hls-player'
import { useMediaKeys } from '@/hooks/custom/use-media-keys'
import { s3GetUrlFromKey } from '@/lib/utils'
import { usePlayerContext } from '@/providers/player-provider'

import { PlayerLeftSection } from './player-left-section'
import { PlayerMidSection } from './player-mid-section'
import { PlayerRightSection } from './player-right-section'

export const HlsPlayer = () => {
  const { activeTrack, activePlaylist, isActiveTrackPlaying } =
    usePlayerContext()

  const {
    trackRef,
    currentTime,
    duration,
    buffered,
    isLoading,
    volume,
    isMuted,
    isLooping,
    isShuffleEnabled,
    playNext,
    playPrevious,
    togglePlayPause,
    stop,
    handleTimeUpdate,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleLoop,
    toggleShuffle
  } = useHlsPlayer()

  const [viewIncremented, setViewIncremented] = useState(false)

  const { mutate: incrementTrackListensMutation } =
    useIncrementTrackListeningCount()

  useEffect(() => {
    setViewIncremented(false)
  }, [activeTrack])

  const handlePlay = () => {
    if (!viewIncremented && activeTrack?.id) {
      incrementTrackListensMutation({ trackId: activeTrack.id })
      setViewIncremented(true)
    }
  }

  useMediaKeys({
    onPlayPause: () => togglePlayPause(!isActiveTrackPlaying),
    onNext: playNext,
    onPrevious: playPrevious,
    isPlaying: isActiveTrackPlaying,
    trackTitle: activeTrack?.title,
    trackArtist: activeTrack?.primaryArtist?.name,
    trackArtwork: activeTrack?.posterKey
      ? s3GetUrlFromKey(activeTrack.posterKey)
      : undefined
  })

  if (!activeTrack) return null

  return (
    <section className="animate-fade-up fixed inset-x-0 bottom-0 z-50 hidden h-[76px] grid-cols-[1fr_25rem_1fr] place-items-center gap-5 border-t bg-white px-4 py-2.5 md:grid xl:grid-cols-[1fr_45rem_1fr]">
      <PlayerLeftSection track={activeTrack} />

      <PlayerMidSection
        buffered={buffered}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        handleTimeUpdate={handleTimeUpdate}
        isActiveTrackPlaying={isActiveTrackPlaying}
        isLoading={isLoading}
        isLooping={isLooping}
        isShuffleEnabled={isShuffleEnabled}
        playNext={playNext}
        playPrevious={playPrevious}
        toggleLoop={toggleLoop}
        togglePlayPause={togglePlayPause}
        toggleShuffle={toggleShuffle}
        trackRef={trackRef}
        onPlay={handlePlay}
      />

      <PlayerRightSection
        activePlaylist={activePlaylist}
        activeTrackId={activeTrack.id}
        activeTrackTitle={activeTrack.title}
        handleVolumeChange={handleVolumeChange}
        isMuted={isMuted}
        stop={stop}
        toggleMute={toggleMute}
        volume={volume}
      />
    </section>
  )
}
