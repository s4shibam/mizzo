import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { LuPlay } from 'react-icons/lu'

import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { isSameCuid, pluralize, s3GetUrlFromKey } from '@/lib/utils'
import type { Playlist } from '@/types/playlist'

type PlaylistCardProps = {
  playlist: Playlist
  descriptionType?: 'trackCount' | 'ownerName' | 'description'
}

export const PlaylistCard = ({
  playlist,
  descriptionType = 'ownerName'
}: PlaylistCardProps) => {
  const { data: session } = useSession()

  const playlistSize =
    playlist?.playlistTracks?.length ?? playlist?._count?.playlistTracks ?? 0

  let playlistDescription = ''

  if (descriptionType === 'trackCount') {
    playlistDescription = pluralize(playlistSize, 'Track')
  } else if (descriptionType === 'description') {
    playlistDescription = playlist?.description || 'No description'
  } else {
    playlistDescription = `By ${playlist?.owner?.name}`
  }

  const playlistLink = isSameCuid(session?.user?.id, playlist?.ownerId)
    ? `/playlist/${playlist?.id}?as=owner`
    : `/playlist/${playlist?.id}`

  return (
    <Link
      className="border-secondary/25 bg-primary-light group inline-block size-full cursor-pointer flex-col overflow-hidden rounded-lg border"
      href={playlistLink}
    >
      <div className="relative grid aspect-square w-full place-items-center">
        <ImageWithFallback
          fill
          alt={playlist?.name + ' poster'}
          className="aspect-square h-auto w-full object-cover"
          draggable={false}
          fallbackSrc={PLAYLIST_POSTER_PLACEHOLDER}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={s3GetUrlFromKey(playlist?.posterKey)}
        />

        <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white p-2 opacity-0 transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100">
          <LuPlay className="text-primary fill-primary size-10" />
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="line-clamp-1 font-medium lg:text-lg">{playlist?.name}</p>
        <p className="line-clamp-2 text-sm lg:text-base/5">
          {playlistDescription}
        </p>
      </div>
    </Link>
  )
}
