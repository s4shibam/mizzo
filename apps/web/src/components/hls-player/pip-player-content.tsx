import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import {
  LuHeart,
  LuPause,
  LuPlay,
  LuSkipBack,
  LuSkipForward
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { getDurationInHMS } from '@/lib/dayjs'
import { s3GetUrlFromKey } from '@/lib/utils'
import type { Track } from '@/types/track'

type PipPlayerContentProps = {
  track: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  isLiked: boolean
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  onLike: () => void
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void
}

export const PipPlayerContent = ({
  currentTime,
  duration,
  isLiked,
  isPlaying,
  track,
  onLike,
  onNext,
  onPlayPause,
  onPrevious,
  onSeek
}: PipPlayerContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const posterUrl = s3GetUrlFromKey(track.posterKey)
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height)
      }
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="from-primary/50 flex size-full grid-rows-10 flex-col items-center justify-center gap-4 bg-gradient-to-br to-white p-4"
    >
      <button
        className={cn(
          'absolute right-2 top-2 flex size-7 items-center justify-center rounded-full border backdrop-blur-xl transition-all hover:scale-105',
          height <= 320 && 'hidden',
          isLiked
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
        )}
        onClick={onLike}
      >
        <LuHeart
          className={cn(
            'size-4 transition-transform',
            isLiked && 'fill-primary'
          )}
        />
      </button>

      <div className={cn('size-40 md:size-80', height <= 320 && 'hidden')}>
        <Image
          alt="Album Art"
          className="size-full shrink-0 rounded-xl object-cover"
          height={100}
          src={posterUrl || ''}
          width={100}
        />
      </div>

      <div
        className={cn('flex flex-col text-center', height <= 80 && 'hidden')}
      >
        <h2 className="text-text-black truncate text-sm font-semibold md:text-base lg:text-lg">
          {track.title}
        </h2>
        <p className="truncate text-xs text-zinc-500 md:text-sm lg:text-base">
          {track.primaryArtist?.name || 'Unknown Artist'}
        </p>
      </div>

      <div
        className={cn(
          'mx-auto flex w-full max-w-80 flex-col gap-1.5',
          height <= 320 && 'hidden'
        )}
      >
        <div
          className="bg-primary/20 hover:bg-primary/30 group h-1 w-full cursor-pointer overflow-hidden rounded-full transition-all"
          onClick={onSeek}
        >
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-text-black/75 flex justify-between text-xs font-medium">
          <span>{getDurationInHMS(currentTime)}</span>
          <span>{getDurationInHMS(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          className="text-text-black grid size-5 place-items-center transition-all hover:scale-105 hover:opacity-90"
          onClick={onPrevious}
        >
          <LuSkipBack className="size-full" />
        </button>

        <button
          className="bg-primary grid size-10 place-items-center rounded-full text-white transition-all hover:opacity-90"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <LuPause className="size-5 fill-white" />
          ) : (
            <LuPlay className="size-5 fill-white" />
          )}
        </button>

        <button
          className="text-text-black grid size-5 place-items-center transition-all hover:scale-105 hover:opacity-90"
          onClick={onNext}
        >
          <LuSkipForward className="size-full" />
        </button>
      </div>
    </div>
  )
}
