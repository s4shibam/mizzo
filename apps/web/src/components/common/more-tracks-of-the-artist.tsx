import { Button } from 'antd'
import Link from 'next/link'
import { LuMusic2, LuSearch } from 'react-icons/lu'

import { TrackBarCard } from '@/components/cards/track'
import { useSearchTracksByUserId } from '@/hooks/api/search'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import type { Artist } from '@/types/user'

import { Loader } from './loader'

type MoreTracksOfTheArtistProps = {
  primaryArtist: Artist | undefined
  excludeTrackId?: string
}

export const MoreTracksOfTheArtist = ({
  primaryArtist,
  excludeTrackId
}: MoreTracksOfTheArtistProps) => {
  const { data: tracks, isLoading } = useSearchTracksByUserId({
    search: primaryArtist?.id || ''
  })

  const onPlay = useOnPlay({
    id: `artist-tracks-${primaryArtist?.id}`,
    name: `${primaryArtist?.name}'s Tracks`,
    playlistTracks: tracks?.data
  })

  if (isLoading) {
    return <Loader />
  }

  const filteredTracks = tracks?.data?.filter(
    (track) => track?.id !== excludeTrackId
  )

  if (filteredTracks?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-20 text-center">
        <div className="from-primary/20 to-primary/10 rounded-full bg-gradient-to-br p-4">
          <LuMusic2 className="text-primary size-8" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-800">
            That&apos;s all for now!
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            {primaryArtist?.name} has not released any other tracks yet.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Stay tuned for more music!
          </p>
        </div>
        <Link href="/search">
          <Button
            className="mt-4 flex items-center gap-2 text-sm"
            icon={<LuSearch />}
            size="large"
            type="primary"
          >
            Discover More Music
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div>
        <p className="text-base">Popular Tracks by</p>

        <p className="text-2xl/6 font-semibold">{primaryArtist?.name}</p>
      </div>

      <div className="mt-4">
        {filteredTracks?.map((track) => (
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
