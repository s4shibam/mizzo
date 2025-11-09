import { useState } from 'react'

import { Tag, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePlayerContext } from 'providers/player-provider'
import { LuHeart, LuPlay } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import MIZZO_PRIMARY_ANIMATED from '@/assets/logos/mizzo-primary-animated.svg'
import MIZZO_PRIMARY from '@/assets/logos/mizzo-primary.svg'
import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { LikeButton } from '@/components/common/like-button'
import { useGetLikeStatusOfTrack } from '@/hooks/api/track'
import { getDurationInHMS } from '@/lib/dayjs'
import { getStatusInfo, isSameCuid, s3GetUrlFromKey } from '@/lib/utils'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

import { TrackMenu } from '../menus/track'

type TrackCardProps = {
  showArtistOnlyInfo?: boolean
  playlist?: Playlist
  track: Track
  playTrack?: () => void
}

export const TrackCard = ({
  playlist,
  showArtistOnlyInfo = false,
  track,
  playTrack
}: TrackCardProps) => {
  const { data: session } = useSession()

  const [isMenuActive, setIsMenuActive] = useState(false)

  const { activeTrack, isActiveTrackPlaying } = usePlayerContext()

  const { data: trackLikeData } = useGetLikeStatusOfTrack({
    trackId: track?.id
  })

  const trackLink = isSameCuid(session?.user?.id, track?.primaryArtistId)
    ? `/track/${track?.id}?as=artist`
    : `/track/${track?.id}`

  return (
    <div
      className={cn(
        'grid-cols-md-track-card xl:grid-cols-xl-track-card group grid items-center gap-2 rounded-lg p-3 pr-6 transition-colors duration-300 hover:bg-black/[0.04]',
        { 'bg-primary/5': activeTrack?.id === track?.id },
        { 'bg-black/5 hover:!bg-black/20': isMenuActive }
      )}
      onDoubleClick={playTrack}
    >
      <div className="relative aspect-square size-full overflow-hidden rounded">
        <ImageWithFallback
          fill
          alt="Poster"
          className="size-full object-cover group-hover:brightness-50"
          draggable={false}
          fallbackSrc={TRACK_POSTER_PLACEHOLDER}
          src={s3GetUrlFromKey(track?.posterKey)}
        />

        <Tooltip title="Play track">
          <button
            className="absolute left-1/2 top-1/2 hidden size-7 -translate-x-1/2 -translate-y-1/2 group-hover:block"
            onClick={playTrack}
          >
            <LuPlay className="fill-primary text-primary size-7" />
          </button>
        </Tooltip>
      </div>

      <div className="flex flex-col">
        <div className="flex h-6 items-center gap-2">
          <Tooltip rootClassName="max-w-md" title={track?.title}>
            <Link
              className="hover:text-primary max-w-sm truncate text-base font-medium xl:text-lg"
              href={trackLink}
            >
              {track?.title}
            </Link>
          </Tooltip>

          {showArtistOnlyInfo &&
            isSameCuid(session?.user?.id, track?.primaryArtistId) && (
              <div className="hidden gap-1 xl:flex">
                <Tag color={getStatusInfo(track?.status).color}>
                  {getStatusInfo(track?.status).text}
                </Tag>

                <Tag color={track.isPublic ? 'green' : 'red'}>
                  {track.isPublic ? 'Public' : 'Private'}
                </Tag>
              </div>
            )}
        </div>

        <Link
          className="w-fit truncate text-xs hover:underline"
          href={`/artist/${track?.primaryArtistId}`}
        >
          {track?.primaryArtist?.name}
        </Link>
      </div>

      <p className="hidden whitespace-nowrap px-10 text-xs xl:block xl:text-sm">
        {track.listens}+
      </p>

      <div
        className={cn('relative hidden size-full opacity-0 xl:block', {
          'opacity-100': isSameCuid(activeTrack?.id, track?.id)
        })}
      >
        <Image
          fill
          alt="Indicator"
          draggable={false}
          src={isActiveTrackPlaying ? MIZZO_PRIMARY_ANIMATED : MIZZO_PRIMARY}
        />
      </div>

      {track.isPublic && track.status === 'PUBLISHED' ? (
        <LikeButton
          key={`like-${track?.id}-${trackLikeData?.data?.isLiked}`}
          className="animate-jump grid cursor-pointer place-items-center p-0.5"
          idType="trackId"
          trackId={track?.id}
        >
          <LuHeart
            className={cn(
              'size-full',
              {
                'fill-primary text-primary': trackLikeData?.data?.isLiked
              },
              {
                'hover: text-black opacity-0 group-hover:opacity-100':
                  !trackLikeData?.data?.isLiked
              }
            )}
          />
        </LikeButton>
      ) : (
        <p />
      )}

      <p className="text-xs xl:text-sm">{getDurationInHMS(track?.duration)}</p>

      <TrackMenu
        className={cn('opacity-0 group-hover:opacity-100', {
          'opacity-100': isMenuActive
        })}
        playlist={playlist}
        track={track}
        onMenuClick={() => setIsMenuActive(true)}
        onMenuClose={() => setIsMenuActive(false)}
      />
    </div>
  )
}
