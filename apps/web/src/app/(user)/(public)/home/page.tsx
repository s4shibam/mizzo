'use client'

import { useEffect, useState } from 'react'

import { Button, Skeleton } from 'antd'
import { useCookies } from 'react-cookie'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { PlaylistCard } from '@/components/cards/playlist'
import { WelcomeBanner } from '@/components/common/welcome-banner'
import { useSearchPlaylistsAsCollection } from '@/hooks/api/search'
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

      <PlaylistCollection slug="most_played" />

      <PlaylistCollection slug="app_picks" />

      <RecentlyPlayedPlaylists />

      <PlaylistCollection slug="india_listening" />
    </div>
  )
}

export default HomePage

const PlaylistCollection = ({ slug }: { slug: string }) => {
  const { width } = useWindowSize()

  const [cardCount, setCardCount] = useState(8)

  const {
    data: playlists,
    isLoading,
    refetch: refetchPlaylists
  } = useSearchPlaylistsAsCollection({
    search: slug,
    limit: cardCount
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
    refetchPlaylists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardCount])

  if ((!isLoading && !playlists?.data?.playlists?.length) || width === 0) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <div className="py-4">
          <SkeletonButton active className="h-9 !w-full" />
        </div>

        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
          {[...Array(cardCount)].map((_, i) => (
            <div
              key={`${slug}-skeleton-${i}`}
              className="flex w-full flex-col gap-2 overflow-hidden rounded-md border xl:h-[16.75rem]"
            >
              <SkeletonImage
                active
                className="h-[11.3rem] w-full rounded-none"
              />

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

const RecentlyPlayedPlaylists = () => {
  const [cookies, setCookies] = useCookies()
  const { width } = useWindowSize()
  const [cardCount, setCardCount] = useState(8)

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
