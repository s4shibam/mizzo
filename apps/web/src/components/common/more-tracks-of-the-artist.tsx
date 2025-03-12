import { TrackCard } from '@/components/cards/track'
import { useSearchTracksByUserId } from '@/hooks/api/search'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import type { Artist } from '@/types/user'

import { ErrorInfo } from './error-info'
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
    return <ErrorInfo customMessage="No songs found" customStatusCode={404} />
  }

  return (
    <div>
      <div>
        <p className="text-base">Popular Tracks by</p>

        <p className="text-2xl/6 font-semibold">{primaryArtist?.name}</p>
      </div>

      <div className="mt-4">
        {filteredTracks?.map((track) => (
          <TrackCard
            key={track?.id}
            playTrack={() => onPlay(track)}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}
