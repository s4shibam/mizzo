'use client'

import { useEffect } from 'react'

import { LuPlay } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import LIKED_TRACKS_PLAYLIST_POSTER from '@/assets/placeholders/liked-tracks-playlist-poster.webp'
import { TrackBarCard } from '@/components/cards/track'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { useGetLikedTracks } from '@/hooks/api/playlist'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { getDurationInHMSWithText } from '@/lib/dayjs'
import { pluralize } from '@/lib/utils'

const LikedTracksPage = () => {
  const { data: likedTracks, isLoading, error } = useGetLikedTracks()

  const onPlay = useOnPlay(likedTracks?.data)

  useEffect(() => {
    document.title = `Liked Tracks - ${APP_SLUG_CAP}`
  }, [])

  if (isLoading) {
    return <Loader loading />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  const totalDuration =
    (likedTracks?.data?.playlistTracks?.length ?? 0) > 0
      ? likedTracks?.data?.playlistTracks?.reduce(
          (sum, track) => sum + Number(track.duration),
          0
        )
      : null

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-5">
      <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
        <ImageWithFallback
          alt="poster"
          className="aspect-square size-[17.5rem] overflow-hidden rounded-xl bg-white object-cover"
          draggable={false}
          fallbackSrc={LIKED_TRACKS_PLAYLIST_POSTER}
          height={280}
          src={LIKED_TRACKS_PLAYLIST_POSTER}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Liked Tracks</h1>

          <h4 className="text-sm text-zinc-600">
            Your personal collection of favorite tracks. Enjoy your handpicked
            music anytime.
          </h4>

          <div className="flex flex-wrap items-center gap-1">
            <div className="mz-pill">
              {pluralize(
                likedTracks?.data?.playlistTracks?.length ?? 0,
                'Track'
              )}
            </div>

            {totalDuration && (
              <div className="mz-pill">
                {getDurationInHMSWithText({
                  secs: totalDuration,
                  minimal: true
                })}
              </div>
            )}
          </div>

          <button
            className="mt-4 rounded-full bg-white p-2.5"
            title="Play All"
            onClick={() => onPlay(likedTracks?.data?.playlistTracks?.[0])}
          >
            <LuPlay className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105" />
          </button>
        </div>
      </div>

      <div>
        {likedTracks?.data?.playlistTracks?.length === 0 && (
          <ErrorInfo
            customMessage="You have no liked tracks"
            customStatusCode={404}
          />
        )}

        {likedTracks?.data?.playlistTracks?.map((track) => (
          <TrackBarCard
            key={track?.id}
            playTrack={() => onPlay(track)}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}

export default LikedTracksPage
