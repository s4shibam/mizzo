import { usePlayerContext } from 'providers/player-provider'
import { useCookies } from 'react-cookie'

import { MAX_RECENTLY_PLAYED_PLAYLISTS } from '@/constants/index'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

export const useOnPlay = (playlist?: Playlist | undefined) => {
  const [cookies, setCookies] = useCookies()

  const { setActiveTrack, setActivePlaylist } = usePlayerContext()

  const onPlay = (track: Track | undefined) => {
    setActiveTrack(track)

    if (playlist) {
      setActivePlaylist(playlist)
    }

    if (isExcludedPlaylist(playlist?.id)) {
      return
    }

    if (cookies.recentlyPlayed) {
      let recentlyPlayed = cookies.recentlyPlayed

      const existingIndex = recentlyPlayed.findIndex(
        (p: Playlist) => p.id === playlist?.id
      )

      if (existingIndex !== -1) {
        recentlyPlayed.splice(existingIndex, 1)
      }

      const playlistCopy = { ...playlist }
      delete playlistCopy.playlistTracks

      recentlyPlayed.unshift(playlistCopy)

      if (recentlyPlayed.length > MAX_RECENTLY_PLAYED_PLAYLISTS) {
        recentlyPlayed = recentlyPlayed.slice(0, MAX_RECENTLY_PLAYED_PLAYLISTS)
      }

      setCookies('recentlyPlayed', JSON.stringify(recentlyPlayed), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    } else {
      setCookies('recentlyPlayed', JSON.stringify([playlist]), {
        path: '/',
        maxAge: 60 * 60 * 24 * 30
      })
    }
  }

  return onPlay
}

const isExcludedPlaylist = (playlistId: string | undefined) => {
  const excludedPlaylistIds = [
    'search-results',
    'liked-songs',
    'artist-tracks',
    'my-collabs',
    'my-uploads'
  ]

  if (!playlistId) return false

  return excludedPlaylistIds.some((excludedId) =>
    playlistId?.startsWith(excludedId)
  )
}
