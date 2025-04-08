'use client'

import { useEffect } from 'react'

import { Button } from 'antd'
import { LuRefreshCw } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { PlaylistCard } from '@/components/cards/playlist'
import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { useGetMyPlaylists } from '@/hooks/api/playlist'

const MyPlaylistsPage = () => {
  const {
    data: myPlaylists,
    isLoading,
    isError,
    error,
    refetch
  } = useGetMyPlaylists()

  useEffect(() => {
    document.title = `My Playlists - ${APP_SLUG_CAP}`
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return (
      <ErrorInfo error={error}>
        <Button
          icon={<LuRefreshCw />}
          size="large"
          type="primary"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </ErrorInfo>
    )
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {myPlaylists?.data?.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          descriptionType="trackCount"
          playlist={playlist}
        />
      ))}
    </div>
  )
}

export default MyPlaylistsPage
