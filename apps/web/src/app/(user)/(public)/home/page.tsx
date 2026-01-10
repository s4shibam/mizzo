'use client'

import { useEffect, useState } from 'react'

import { Button, Skeleton } from 'antd'
import { useCookies } from 'react-cookie'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { ArtistCard } from '@/components/cards/artist'
import { PlaylistCard } from '@/components/cards/playlist'
import { TrackCard } from '@/components/cards/track'
import { WelcomeBanner } from '@/components/common/welcome-banner'
import {
  useGetTopArtists,
  useGetTopTracks,
  useSearchPlaylistsAsCollection
} from '@/hooks/api/search'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { useWindowSize } from '@/hooks/custom/use-window-size'
import { api } from '@/services/api'
import type { Playlist } from '@/types/playlist'

const { Button: SkeletonButton, Image: SkeletonImage } = Skeleton

const HomePage = () => {
  useEffect(() => {
    document.title = `${APP_SLUG_CAP} - Where music flows`
  }, [])

  useEffect(() => {
    const serverConnectionCheck = async () => {
      try {
        await api.get('/')
      } catch (error) {
        console.error('Failed to connect to the server: ', error)
      }
    }

    serverConnectionCheck()
  }, [])

  return (
    <div className="space-y-6">
      <WelcomeBanner />

      <PlaylistCollection slug="india_listening" />

      <TopTracksCollection />

      <PlaylistCollection slug="most_played" />

      <TopArtistsCollection />

      <RecentlyPlayedPlaylists />

      <PlaylistCollection slug="app_picks" />
    </div>
  )
}

export default HomePage

const PlaylistCollection = ({ slug }: { slug: string }) => {
  const { width } = useWindowSize()

  const [cardCount, setCardCount] = useState(0)

  const {
    data: playlists,
    isLoading,
    refetch: refetchPlaylists
  } = useSearchPlaylistsAsCollection(
    {
      search: slug,
      limit: cardCount
    },
    {
      enabled: width !== 0 && cardCount !== 0
    }
  )

  useEffect(() => {
    if (width < 1280) {
      setCardCount(4)
    } else if (width >= 1280 && width < 1536) {
      setCardCount(6)
    } else if (width >= 1536) {
      setCardCount(8)
    }
  }, [width])

  useEffect(() => {
    if (width !== 0 && cardCount !== 0) {
      refetchPlaylists()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCount])

  if ((!isLoading && !playlists?.data?.playlists?.length) || width === 0) {
    return null
  }

  if (isLoading) {
    return <CollectionSkeleton cardCount={cardCount} />
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-primary w-full py-3 text-xl font-bold xl:text-2xl">
        {playlists?.data?.heading}
      </p>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {playlists?.data?.playlists.map((playlist) => (
          <PlaylistCard
            key={`${slug}-${playlist?.id}`}
            descriptionType="description"
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  )
}

const TopTracksCollection = () => {
  const { width } = useWindowSize()
  const [cardCount, setCardCount] = useState(0)

  const {
    data: topTracks,
    isLoading,
    refetch: refetchTopTracks
  } = useGetTopTracks(
    {
      limit: cardCount
    },
    {
      enabled: width !== 0 && cardCount !== 0
    }
  )

  const onPlay = useOnPlay({
    id: 'top-tracks',
    name: 'Top Tracks',
    playlistTracks: topTracks?.data?.tracks || []
  })

  useEffect(() => {
    if (width < 1280) {
      setCardCount(4)
    } else if (width >= 1280 && width < 1536) {
      setCardCount(6)
    } else if (width >= 1536) {
      setCardCount(8)
    }
  }, [width])

  useEffect(() => {
    if (width !== 0 && cardCount !== 0) {
      refetchTopTracks()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCount])

  if ((!isLoading && !topTracks?.data?.tracks?.length) || width === 0) {
    return null
  }

  if (isLoading) {
    return <CollectionSkeleton cardCount={cardCount} />
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-primary w-full py-3 text-xl font-bold xl:text-2xl">
        {topTracks?.data?.heading}
      </p>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {topTracks?.data?.tracks.map((track) => (
          <TrackCard
            key={`top-track-${track?.id}`}
            playTrack={() => onPlay(track)}
            track={track}
          />
        ))}
      </div>
    </div>
  )
}

const TopArtistsCollection = () => {
  const { width } = useWindowSize()
  const [cardCount, setCardCount] = useState(0)

  const {
    data: topArtists,
    isLoading,
    refetch: refetchTopArtists
  } = useGetTopArtists(
    {
      limit: cardCount
    },
    {
      enabled: width !== 0 && cardCount !== 0
    }
  )

  useEffect(() => {
    if (width < 1280) {
      setCardCount(4)
    } else if (width >= 1280 && width < 1536) {
      setCardCount(6)
    } else if (width >= 1536) {
      setCardCount(8)
    }
  }, [width])

  useEffect(() => {
    if (width !== 0 && cardCount !== 0) {
      refetchTopArtists()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCount])

  if ((!isLoading && !topArtists?.data?.artists?.length) || width === 0) {
    return null
  }

  if (isLoading) {
    return <CollectionSkeleton cardCount={cardCount} />
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-primary w-full py-3 text-xl font-bold xl:text-2xl">
        {topArtists?.data?.heading}
      </p>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {topArtists?.data?.artists.map((artist) => (
          <ArtistCard key={`top-artist-${artist?.id}`} artist={artist} />
        ))}
      </div>
    </div>
  )
}

const RecentlyPlayedPlaylists = () => {
  const [cookies, setCookies] = useCookies()
  const { width } = useWindowSize()
  const [cardCount, setCardCount] = useState(0)

  const playlists: Playlist[] = cookies.recentlyPlayed || []

  useEffect(() => {
    if (width < 1280) {
      setCardCount(4)
    } else if (width >= 1280 && width < 1536) {
      setCardCount(6)
    } else if (width >= 1536) {
      setCardCount(8)
    }
  }, [width])

  const handleClearAll = () => {
    setCookies('recentlyPlayed', [], {
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    })
  }

  if (!playlists.length || width === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between py-3">
        <p className="text-primary text-xl font-bold xl:text-2xl">
          Recently Played
        </p>

        <Button
          className="text-primary font-medium"
          type="text"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {playlists.slice(0, cardCount).map((playlist) => (
          <PlaylistCard
            key={`${playlist?.id}`}
            descriptionType="trackCount"
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  )
}

const CollectionSkeleton = ({ cardCount }: { cardCount: number }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="py-4">
        <SkeletonButton active className="h-9 !w-full" />
      </div>

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {[...Array(cardCount)].map((_, i) => (
          <div
            key={i}
            className="flex w-full flex-col gap-2 overflow-hidden rounded-md border xl:h-[16.75rem]"
          >
            <SkeletonImage active className="h-[11.3rem] w-full rounded-none" />

            <div className="flex w-full flex-col gap-1 px-2">
              <SkeletonButton active style={{ width: '50%' }} />

              <SkeletonButton active style={{ width: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
