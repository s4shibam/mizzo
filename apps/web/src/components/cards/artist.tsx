import Link from 'next/link'
import { LuPlay } from 'react-icons/lu'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { s3GetUrlFromKey } from '@/lib/utils'
import type { User } from '@/types/user'

type ArtistCardProps = {
  artist: User
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link
      className="border-secondary/25 bg-primary-light group inline-block size-full cursor-pointer flex-col overflow-hidden rounded-lg border"
      href={`/artist/${artist?.id}`}
    >
      <div className="relative grid aspect-square w-full place-items-center">
        <ImageWithFallback
          alt={artist?.name + ' Avatar'}
          className="aspect-square h-auto w-full object-cover"
          draggable={false}
          fallbackSrc={ARTIST_AVATAR_PLACEHOLDER}
          fill={true}
          src={s3GetUrlFromKey(artist?.profile?.avatarKey)}
        />

        <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white p-2 opacity-0 transition-all duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100">
          <LuPlay className="text-primary fill-primary size-10" />
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="line-clamp-1 font-medium">{artist?.name}</p>
        <p className="line-clamp-2 text-sm">Artist</p>
      </div>
    </Link>
  )
}
