'use client'

import { Tooltip } from 'antd'
import Link from 'next/link'
import { LuHeart } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { useGetLikeStatusOfTrack } from '@/hooks/api/track'
import { s3GetUrlFromKey } from '@/lib/utils'
import type { Track } from '@/types/track'

import { ImageWithFallback } from '../common/image-with-fallback'
import { LikeButton } from '../common/like-button'

type PlayerLeftSectionProps = {
  track: Track
}

export const PlayerLeftSection = ({ track }: PlayerLeftSectionProps) => {
  const { data: trackLikeData } = useGetLikeStatusOfTrack({
    trackId: track?.id || ''
  })

  return (
    <div className="mr-auto flex items-center gap-4 truncate">
      <Link className="shrink-0" href={`/track/${track.id}`}>
        <ImageWithFallback
          alt="Poster"
          className="aspect-square h-14 w-full rounded-md object-cover"
          draggable={false}
          height={56}
          src={s3GetUrlFromKey(track.posterKey)}
          width={56}
        />
      </Link>

      <div className="hidden w-fit max-w-56 flex-col truncate lg:flex">
        <Link
          className="hover:text-primary truncate text-lg/5 font-medium"
          href={`/track/${track.id}`}
        >
          {track.title}
        </Link>

        <Link
          className="w-fit truncate text-sm/4 hover:underline"
          href={`/artist/${track.primaryArtistId}`}
        >
          {track.primaryArtist?.name}
        </Link>
      </div>

      <LikeButton idType="trackId" trackId={track.id}>
        <Tooltip
          title={
            trackLikeData?.data?.isLiked
              ? 'Remove from Liked Tracks'
              : 'Add to Liked Tracks'
          }
        >
          <LuHeart
            className={cn(
              'my-auto size-6 cursor-pointer',
              trackLikeData?.data?.isLiked && 'text-primary fill-primary'
            )}
          />
        </Tooltip>
      </LikeButton>
    </div>
  )
}
