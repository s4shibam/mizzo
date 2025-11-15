'use client'

import { Suspense, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { LuSearch, LuTrendingUp } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { ArtistCard } from '@/components/cards/artist'
import { PlaylistCard } from '@/components/cards/playlist'
import { TrackCard } from '@/components/cards/track'
import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import {
  useSearchPlaylistsByPlaylistName,
  useSearchTracksByTrackName,
  useSearchUsersByUserName
} from '@/hooks/api/search'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { useWindowSize } from '@/hooks/custom/use-window-size'
import { getTrendingSearches } from '@/lib/utils'

const SearchPage = () => {
  return (
    <Suspense fallback={<Loader loading text="Loading search..." />}>
      <SearchContent />
    </Suspense>
  )
}

export default SearchPage

const SearchContent = () => {
  const { width } = useWindowSize()
  const { qParams } = useQueryParams()
  const searchQuery = qParams.q || ''

  const [noData, setNoData] = useState(false)
  const [cardCount, setCardCount] = useState(8)

  const {
    data: tracks,
    isLoading: isTracksLoading,
    isError: isTracksError,
    refetch: refetchTracks
  } = useSearchTracksByTrackName({ search: searchQuery })

  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    isError: isPlaylistsError,
    refetch: refetchPlaylists
  } = useSearchPlaylistsByPlaylistName({
    search: searchQuery,
    perPage: cardCount
  })

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    refetch: refetchUsers
  } = useSearchUsersByUserName({
    search: searchQuery,
    perPage: cardCount
  })

  const onPlay = useOnPlay({
    id: `search-results-${searchQuery}-${Date.now()}`,
    name: 'Search Results',
    playlistTracks: tracks?.data
  })

  useEffect(() => {
    setNoData(isTracksError && isPlaylistsError && isUsersError)
  }, [isUsersError, isPlaylistsError, isTracksError])

  useEffect(() => {
    if (searchQuery.length === 0) {
      return
    }

    refetchTracks()
    refetchPlaylists()
    refetchUsers()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, cardCount])

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
    document.title = `Search - ${APP_SLUG_CAP}`
  }, [])

  if (isTracksLoading || isPlaylistsLoading || isUsersLoading) {
    return <Loader loading text="Searching..." />
  }

  if (searchQuery.length === 0) {
    return <SearchPlaceholder />
  }

  if (noData) {
    return (
      <ErrorInfo
        customMessage={`No results found for "${searchQuery}"`}
        customStatusCode={404}
      />
    )
  }

  return (
    <div className="flex h-full flex-col gap-6">
      {tracks && (
        <div>
          <p className="px-4 py-2 text-2xl">Tracks</p>

          {tracks?.data?.map((track) => (
            <TrackCard
              key={track?.id}
              playTrack={() => onPlay(track)}
              track={track}
            />
          ))}
        </div>
      )}

      {playlists && (
        <div>
          <p className="px-4 py-2 text-2xl">Playlists</p>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {playlists?.data?.map((playlist) => (
              <PlaylistCard
                key={playlist?.id}
                descriptionType="ownerName"
                playlist={playlist}
              />
            ))}
          </div>
        </div>
      )}

      {users && (
        <div>
          <p className="px-4 py-2 text-2xl">Artists</p>

          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {users?.data?.map((user) => (
              <ArtistCard key={user?.id} artist={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const TRENDING_SEARCHES = getTrendingSearches()

const SearchPlaceholder = () => {
  const router = useRouter()

  // Function to handle trending search click
  const handleTrendingSearchClick = (searchTerm: string) => {
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6">
      <div className="bg-primary/10 flex size-24 items-center justify-center rounded-full">
        <LuSearch className="text-primary size-12 stroke-[1.5]" />
      </div>

      <div className="max-w-lg space-y-3 text-center">
        <h2 className="text-3xl font-bold">Discover new music</h2>
        <p className="text-lg">
          Search for your favorite tracks, artists, or playlists to start your
          musical journey
        </p>
      </div>

      <div className="mt-2 flex w-full max-w-xl flex-col items-center">
        <div className="mb-3 flex items-center gap-2">
          <LuTrendingUp className="text-primary size-5" />
          <h3 className="text-lg font-medium">Trending Today</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {TRENDING_SEARCHES.map((term, index) => (
            <button
              key={index}
              className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
              onClick={() => handleTrendingSearchClick(term)}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
