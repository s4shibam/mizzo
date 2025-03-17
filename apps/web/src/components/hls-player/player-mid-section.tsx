import { Tooltip } from 'antd'
import {
  LuPause,
  LuPlay,
  LuRepeat2,
  LuShuffle,
  LuSkipBack,
  LuSkipForward
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { getDurationInHMS } from '@/lib/dayjs'

type PlayerMidSectionProps = {
  trackRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
  buffered: number
  isLoading: boolean
  isLooping: boolean
  isShuffleEnabled: boolean
  isActiveTrackPlaying: boolean
  playNext: () => void
  playPrevious: () => void
  togglePlayPause: (play: boolean) => void
  handleTimeUpdate: () => void
  handleSeek: (newTime: number) => void
  toggleLoop: () => void
  toggleShuffle: () => void
  onPlay: () => void
}

export const PlayerMidSection = ({
  trackRef,
  currentTime,
  duration,
  buffered,
  isLoading,
  isLooping,
  isShuffleEnabled,
  isActiveTrackPlaying,
  playNext,
  playPrevious,
  togglePlayPause,
  handleTimeUpdate,
  handleSeek,
  toggleLoop,
  toggleShuffle,
  onPlay
}: PlayerMidSectionProps) => {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    handleSeek(newTime)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <audio
        ref={trackRef}
        hidden
        loop={isLooping}
        onEnded={playNext}
        onLoadedMetadata={() => {
          if (trackRef.current) {
            handleTimeUpdate()
          }
        }}
        onPause={() => togglePlayPause(false)}
        onPlay={() => {
          togglePlayPause(true)
          onPlay()
        }}
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="flex w-full items-center justify-center gap-3 px-8">
        <Tooltip title="Shuffle">
          <button
            aria-label="Shuffle"
            className={cn('mr-2', isShuffleEnabled && 'text-primary')}
            onClick={toggleShuffle}
          >
            <LuShuffle
              className={cn('size-4', isShuffleEnabled && 'text-primary')}
            />
          </button>
        </Tooltip>

        <Tooltip title="Previous">
          <button onClick={playPrevious}>
            <LuSkipBack className="size-5" />
          </button>
        </Tooltip>

        <button
          aria-label={isActiveTrackPlaying ? 'Pause' : 'Play'}
          className="bg-primary/75 mx-1 rounded-full p-2 text-white"
          disabled={isLoading}
          onClick={() => togglePlayPause(!isActiveTrackPlaying)}
        >
          {isActiveTrackPlaying ? (
            <LuPause className="size-6 fill-white" />
          ) : (
            <LuPlay className="size-6 fill-white" />
          )}
        </button>

        <Tooltip title="Next">
          <button onClick={playNext}>
            <LuSkipForward className="size-5" />
          </button>
        </Tooltip>

        <Tooltip title="Loop">
          <button
            aria-label="Loop"
            className={cn('ml-2', isLooping && 'text-primary')}
            onClick={toggleLoop}
          >
            <LuRepeat2 className="size-5" />
          </button>
        </Tooltip>
      </div>

      <div className="grid w-full grid-cols-[3rem_1fr_3rem] items-center gap-2 px-2 text-xs">
        <span className="ml-auto">{getDurationInHMS(currentTime)}</span>

        <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-200">
          <div
            className="bg-primary/20 absolute h-1"
            style={{ width: `${buffered}%` }}
          />

          <div
            className="bg-primary absolute h-1"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`
            }}
          />

          <input
            className="absolute z-10 h-1 w-full cursor-pointer opacity-0"
            max={duration || 100}
            min={0}
            type="range"
            value={currentTime}
            onChange={handleProgressChange}
          />
        </div>

        <span className="mr-auto">{getDurationInHMS(duration)}</span>
      </div>
    </div>
  )
}
