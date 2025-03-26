'use client'

import { useEffect } from 'react'

import { Drawer, Tag, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { usePlayerContext } from 'providers/player-provider'
import {
  LuFileMusic,
  LuHeart,
  LuPause,
  LuPenLine,
  LuPlay
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { LikeButton } from '@/components/common/like-button'
import { Loader } from '@/components/common/loader'
import { MoreTracksOfTheArtist } from '@/components/common/more-tracks-of-the-artist'
import { UpdateTrackForm } from '@/components/forms/update-track'
import { TrackMenu } from '@/components/menus/track'
import { useSearchTrackByTrackId } from '@/hooks/api/search'
import { useGetLikeStatusOfTrack } from '@/hooks/api/track'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { getDurationInHMS, getFormattedDate } from '@/lib/dayjs'
import {
  getStatusInfo,
  isSameCuid,
  pluralize,
  s3GetUrlFromKey
} from '@/lib/utils'

const TrackByTrackIdPage = () => {
  const { data: session } = useSession()
  const params = useParams() as { trackId: string }
  const { qParams } = useQueryParams()
  const as = qParams.as as 'owner' | 'artist' | undefined
  const isArtistView = as === 'artist'

  const onPlay = useOnPlay()
  const { drawerWidth } = useDrawerWidth()
  const { isActiveTrackPlaying, setIsActiveTrackPlaying, activeTrack } =
    usePlayerContext()

  const {
    isOpen: isUpdateTrackDrawerOpen,
    open: openUpdateTrackDrawer,
    close: closeUpdateTrackDrawer
  } = useOpenClose()

  const {
    isOpen: isLyricsDrawerOpen,
    open: openLyricsDrawer,
    close: closeLyricsDrawer
  } = useOpenClose()

  const {
    data: track,
    isLoading,
    error
  } = useSearchTrackByTrackId({ search: params?.trackId, as })

  const { data: trackLikeData } = useGetLikeStatusOfTrack({
    trackId: track?.data?.id || ''
  })

  useEffect(() => {
    document.title = 'Track - ' + (track?.data?.title || 'Not Found')
  }, [track?.data?.title])

  if (isLoading) {
    return <Loader loading={isLoading} />
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
          src={s3GetUrlFromKey(track?.data?.posterKey)}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <Tooltip title={track?.data?.title}>
            <h1 className="line-clamp-2 text-3xl font-bold">
              {track?.data?.title}
            </h1>
          </Tooltip>

          <div className="flex items-center justify-center gap-1">
            {track?.data?.lyrics && (
              <Tooltip title="Lyrics">
                <button
                  className="hover:bg-background rounded-md p-2"
                  onClick={openLyricsDrawer}
                >
                  <LuFileMusic />
                </button>
              </Tooltip>
            )}

            {isArtistView &&
              isSameCuid(session?.user?.id, track?.data?.primaryArtistId) && (
                <Tooltip title="Update Track">
                  <button
                    className="hover:bg-background rounded-md p-2"
                    onClick={openUpdateTrackDrawer}
                  >
                    <LuPenLine />
                  </button>
                </Tooltip>
              )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1">
            <Tooltip title={track?.data?.primaryArtist?.name}>
              <Link
                className="mz-pill line-clamp-1 max-w-48 cursor-pointer"
                href={`/artist/${track?.data?.primaryArtistId}`}
              >
                By {track?.data?.primaryArtist?.name.split(' ')[0]}
              </Link>
            </Tooltip>

            <Tooltip title={getFormattedDate(track?.data?.createdAt)}>
              <p className="mz-pill">
                {getFormattedDate(track?.data?.createdAt, 'YYYY')}
              </p>
            </Tooltip>

            <p className="mz-pill">{getDurationInHMS(track?.data?.duration)}</p>

            <Tooltip title={pluralize(track?.data?.listens, 'Listen')}>
              <p className="mz-pill flex items-center gap-1">
                {track?.data?.listens || 'N/A'}
              </p>
            </Tooltip>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            {track?.data?.isPublic && (
              <LikeButton
                key={`like-${track?.data?.id}-${trackLikeData?.data?.isLiked}`}
                className="animate-jump grid size-8 cursor-pointer place-items-center"
                idType="trackId"
                trackId={track?.data?.id}
              >
                <LuHeart
                  className={cn(
                    'size-full',
                    {
                      'fill-primary text-primary': trackLikeData?.data?.isLiked
                    },
                    {
                      'text-black': !trackLikeData?.data?.isLiked
                    }
                  )}
                />
              </LikeButton>
            )}

            {isSameCuid(activeTrack?.id, track?.data?.id) &&
            isActiveTrackPlaying ? (
              <Tooltip title="Pause">
                <button className="rounded-full bg-white p-2.5">
                  <LuPause
                    className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105"
                    onClick={() => setIsActiveTrackPlaying(false)}
                  />
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Play">
                <button className="rounded-full bg-white p-2.5">
                  <LuPlay
                    className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105"
                    onClick={() => {
                      if (isSameCuid(activeTrack?.id, track?.data?.id)) {
                        setIsActiveTrackPlaying(true)
                      } else {
                        onPlay(track?.data)
                      }
                    }}
                  />
                </button>
              </Tooltip>
            )}

            {track?.data && <TrackMenu track={track.data} />}
          </div>
        </div>

        {isArtistView &&
          isSameCuid(session?.user?.id, track?.data?.primaryArtistId) && (
            <div className="flex items-center justify-center gap-1">
              <Tag color={getStatusInfo(track?.data?.status).color}>
                {getStatusInfo(track?.data?.status).text}
              </Tag>

              <Tag color={track?.data?.isPublic ? 'green' : 'red'}>
                {track?.data?.isPublic ? 'Public' : 'Private'}
              </Tag>
            </div>
          )}
      </div>

      <div>
        {track?.data && (
          <MoreTracksOfTheArtist
            excludeTrackId={track?.data?.id}
            primaryArtist={track?.data?.primaryArtist}
          />
        )}
      </div>

      <Drawer
        destroyOnClose
        className="relative size-full"
        open={isUpdateTrackDrawerOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Update Track"
        width={drawerWidth}
        onClose={closeUpdateTrackDrawer}
      >
        {track?.data && (
          <UpdateTrackForm close={closeUpdateTrackDrawer} track={track?.data} />
        )}
      </Drawer>

      <Drawer
        destroyOnClose
        className="relative size-full"
        open={isLyricsDrawerOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Lyrics"
        width={drawerWidth}
        onClose={closeLyricsDrawer}
      >
        <div className="h-full overflow-y-auto p-4">
          <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-700">
            {track?.data?.lyrics || 'No lyrics available.'}
          </pre>
        </div>
      </Drawer>
    </div>
  )
}

export default TrackByTrackIdPage
