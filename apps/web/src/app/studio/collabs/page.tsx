'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import { usePlayerContext } from 'providers/player-provider'
import { LuCirclePlay } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { TrackCard } from '@/components/cards/track'
import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { useGetMyCollaboratedTracks } from '@/hooks/api/track'
import { useOnPlay } from '@/hooks/custom/use-on-play'

const MyCollabs = () => {
  const { activeTrack, activePlaylist, isActiveTrackPlaying } =
    usePlayerContext()
  const { data: collabs, isLoading, error } = useGetMyCollaboratedTracks()

  const onPlay = useOnPlay({
    id: 'my-collabs',
    name: 'My Collabs',
    playlistTracks: collabs?.data
  })

  useEffect(() => {
    document.title = `My Collabs - ${APP_SLUG_CAP}`
  }, [])

  if (isLoading || error) {
    return (
      <>
        <Loader loading={isLoading} text="Loading..." />
        <ErrorInfo error={error} />
      </>
    )
  }

  return (
    <div>
      <div className="mz-banner">
        <div className="mz-banner-image-wrapper mz-shine">
          <Image
            fill
            alt="poster"
            className="object-cover"
            draggable={false}
            src={TRACK_POSTER_PLACEHOLDER}
          />
        </div>

        <div className="mt-auto flex w-full flex-col gap-2">
          <p className="mz-banner-heading">My Collabs</p>
          <div className="mz-pill">
            {collabs?.data?.length === 1 && '1 Track'}
            {(collabs?.data?.length ?? 0) > 1 &&
              `${collabs?.data?.length} Tracks`}
          </div>
        </div>
      </div>
      <div className="bg-primary-light flex items-center gap-3 border-y px-5 py-1">
        <LuCirclePlay
          className="text-primary size-10 cursor-pointer stroke-[1.5] transition-all hover:scale-105 lg:size-14"
          title="Play All"
          onClick={() => onPlay(collabs?.data?.[0])}
        />

        {activePlaylist?.id === 'my-collabs' &&
          activeTrack &&
          isActiveTrackPlaying && (
            <p className="animate-fade-right text-primary truncate text-lg font-medium">
              Playing {activeTrack?.title}
            </p>
          )}
      </div>

      {collabs?.data?.map((track) => (
        <TrackCard
          key={track?.id}
          playTrack={() => onPlay(track)}
          track={track}
        />
      ))}
    </div>
  )
}

export default MyCollabs
