'use client'

import { useEffect } from 'react'

import { Button } from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuPlay, LuUpload } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { TrackCard } from '@/components/cards/track'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { useGetMyUploads } from '@/hooks/api/track'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { getDurationInHMSWithText } from '@/lib/dayjs'
import { pluralize } from '@/lib/utils'

const ContentPage = () => {
  const { data: uploads, isLoading, error } = useGetMyUploads()

  const onPlay = useOnPlay(uploads?.data)

  useEffect(() => {
    document.title = `My Uploads - ${APP_SLUG_CAP}`
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-5">
      <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
        <ImageWithFallback
          alt="poster"
          className="aspect-square size-[17.5rem] overflow-hidden rounded-xl bg-white object-cover"
          draggable={false}
          fallbackSrc={TRACK_POSTER_PLACEHOLDER}
          height={280}
          src={TRACK_POSTER_PLACEHOLDER}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">My Content</h1>

          <h4 className="text-sm text-zinc-600">
            View and manage your uploaded songs. Track plays, likes, duration,
            and publication status of your content.
          </h4>

          <div className="flex flex-wrap items-center gap-1">
            <div className="mz-pill">
              {pluralize(uploads?.data?.playlistTracks?.length ?? 0, 'Song')}
            </div>

            <div className="mz-pill">
              {getDurationInHMSWithText({
                secs: uploads?.data?.playlistTracks?.reduce(
                  (sum, track) => sum + Number(track.duration),
                  0
                ),
                minimal: true
              })}
            </div>
          </div>

          <button
            className="mt-4 rounded-full bg-white p-2"
            title="Play All"
            onClick={() => {
              if (uploads?.data?.playlistTracks?.length === 0) {
                toast.error('You have not uploaded any songs yet')
                return
              }

              onPlay(uploads?.data?.playlistTracks?.[0])
            }}
          >
            <LuPlay className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105" />
          </button>
        </div>
      </div>

      <div>
        {uploads?.data?.playlistTracks?.length === 0 && (
          <ErrorInfo
            customMessage="You have not uploaded any songs yet"
            customStatusCode={404}
          >
            <Link href="/studio/upload">
              <Button icon={<LuUpload />} size="large" type="primary">
                Upload Track
              </Button>
            </Link>
          </ErrorInfo>
        )}

        {uploads?.data?.playlistTracks?.map((track) => (
          <TrackCard
            key={track?.id}
            showArtistOnlyInfo
            playTrack={() => onPlay(track)}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}

export default ContentPage
