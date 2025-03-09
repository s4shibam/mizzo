import { useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'
import type { TApiPromise, TQueryOpts } from '@/types/api'

// Artist Api Types

type TArtistDashboardSummary = {
  totalTracks: number
  totalLikesOnTracks: number
  totalPlaylists: number
  totalLikesOnPlaylists: number
  totalPlaylistsContainingTracks: number
  totalCollaborations: number
}

// Artist Api Endpoints
const getArtistDashboardSummary = (): TApiPromise<TArtistDashboardSummary> => {
  return api.get('/artist/home/dashboard-summary')
}

// Artist Api Hooks
export const useGetArtistDashboardSummary = (
  opts?: TQueryOpts<TArtistDashboardSummary>
) => {
  return useQuery({
    queryKey: ['useGetArtistDashboardSummary'],
    queryFn: getArtistDashboardSummary,
    ...opts
  })
}
