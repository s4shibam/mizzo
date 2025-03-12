import { useSearchPlaylistsByUserId } from '@/hooks/api/search'
import type { User } from '@/types/user'

import { PlaylistCard } from '../cards/playlist'
import { ErrorInfo } from './error-info'
import { Loader } from './loader'

type PublicPlaylistsOfUserProps = {
  user: User | undefined
}

export const PublicPlaylistsOfUser = ({ user }: PublicPlaylistsOfUserProps) => {
  const {
    data: playlists,
    isLoading,
    error
  } = useSearchPlaylistsByUserId({
    search: user?.id || ''
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  return (
    <div>
      <div>
        <p className="text-base">Public Playlists by</p>
        <p className="text-2xl/6 font-semibold">{user?.name}</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 lg:grid-cols-4">
        {playlists?.data?.map((playlist) => (
          <PlaylistCard
            key={playlist?.id}
            descriptionType="trackCount"
            playlist={playlist}
          />
        ))}
      </div>
    </div>
  )
}
