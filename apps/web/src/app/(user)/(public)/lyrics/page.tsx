'use client'

import { LuSparkles } from 'react-icons/lu'

import { LiveLyricsDisplay } from '@/components/common/live-lyrics-display'
import { Loader } from '@/components/common/loader'
import { useGetTrackLiveLyric } from '@/hooks/api/track'
import { usePlayerContext } from '@/providers/player-provider'

const LyricsPage = () => {
  const { activeTrack, syncedCurrentTime } = usePlayerContext()

  const { data: liveLyricResponse, isLoading: isLiveLyricLoading } =
    useGetTrackLiveLyric(
      { trackId: activeTrack?.id || '' },
      { enabled: !!activeTrack?.id }
    )

  const liveLyric = liveLyricResponse?.data
  const currentTimeMs = syncedCurrentTime * 1000

  if (!activeTrack) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center text-zinc-600">
        <p className="text-lg font-semibold">Play a track to view lyrics</p>
      </div>
    )
  }

  if (isLiveLyricLoading) {
    return <Loader loading />
  }

  if (!liveLyric) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center text-zinc-600">
        <p className="text-lg font-semibold">
          Lyrics not available for this track
        </p>
      </div>
    )
  }

  if (liveLyric.status === 'PENDING' || liveLyric.status === 'PROCESSING') {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center text-zinc-600">
        <Loader loading />
        <p className="text-lg font-semibold">Generating lyrics...</p>
      </div>
    )
  }

  if (liveLyric.status === 'FAILED') {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center text-zinc-600">
        <p className="text-lg font-semibold">
          Lyrics generation failed. Please try again later.
        </p>
      </div>
    )
  }

  if (!liveLyric.content?.lines?.length) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center text-zinc-600">
        <p className="text-lg font-semibold">
          Lyrics not available for this track
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col gap-20 p-4">
      <LiveLyricsDisplay
        currentTime={currentTimeMs}
        lines={liveLyric.content.lines}
      />

      <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 opacity-75">
        <LuSparkles className="size-3" />
        <p>Lyrics are AI generated and may contain inaccuracies</p>
      </div>
    </div>
  )
}

export default LyricsPage
