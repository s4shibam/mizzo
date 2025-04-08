'use client'

import { useEffect } from 'react'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { PlaylistCard } from '@/components/cards/playlist'
import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { useGetLikedPlaylists } from '@/hooks/api/playlist'

const LikedPlaylistsPage = () => {
  const { data: likedPlaylists, isLoading, error } = useGetLikedPlaylists()

  useEffect(() => {
    document.title = `Liked Playlists - ${APP_SLUG_CAP}`
  }, [])

  if (isLoading) {
    return <Loader loading />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
      {likedPlaylists?.data?.map((playlist) => (
        <PlaylistCard
          key={playlist?.id}
          descriptionType="trackCount"
          playlist={playlist}
        />
      ))}
    </div>
  )
}

export default LikedPlaylistsPage
