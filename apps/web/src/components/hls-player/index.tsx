'use client'

import { useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import {
  useGetLikeStatusOfTrack,
  useIncrementTrackListeningCount,
  useToggleLikeOfTrack
} from '@/hooks/api/track'
import { useHlsPlayer } from '@/hooks/custom/use-hls-player'
import { usePlayerContext } from '@/providers/player-provider'
import { invalidateQueries } from '@/services/tanstack'

import { PipPlayer } from './pip-player'
import { PlayerLeftSection } from './player-left-section'
import { PlayerMidSection } from './player-mid-section'
import { PlayerRightSection } from './player-right-section'

export const HlsPlayer = () => {
  const {
    activeTrack,
    activePlaylist,
    isActiveTrackPlaying,
    isPipMode,
    setIsPipMode
  } = usePlayerContext()

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

  const { data: trackLikeData } = useGetLikeStatusOfTrack({
    trackId: activeTrack?.id || ''
  })

  const { mutate: toggleLikeMutation } = useToggleLikeOfTrack({
    onError: (error) => toast.error(error.message),
    onSuccess: (success) => {
      toast.success(success.message)
      invalidateQueries({
        queryKey: ['useGetLikeStatusOfTrack', { trackId: activeTrack?.id }]
      })
      setTimeout(() => {
        invalidateQueries({ queryKey: ['useGetLikedTracks'] })
      }, 500)
    }
  })

  useEffect(() => {
    setViewIncremented(false)
  }, [activeTrack])

  const handlePlay = () => {
    if (!viewIncremented && activeTrack?.id) {
      incrementTrackListensMutation({ trackId: activeTrack.id })
      setViewIncremented(true)
    }
  }

  const handleTogglePip = () => {
    setIsPipMode(true)
  }

  const handleClosePip = () => {
    setIsPipMode(false)
  }

  const handleToggleLike = () => {
    if (activeTrack?.id) {
      toggleLikeMutation({ trackId: activeTrack.id })
    }
  }

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
        onTogglePip={handleTogglePip}
      />

      {isPipMode && (
        <PipPlayer
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          isLiked={trackLikeData?.data?.isLiked || false}
          isPlaying={isActiveTrackPlaying}
          playNext={playNext}
          playPrevious={playPrevious}
          toggleLike={handleToggleLike}
          togglePlayPause={togglePlayPause}
          track={activeTrack}
          onClose={handleClosePip}
        />
      )}
    </section>
  )
}
