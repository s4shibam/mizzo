import { useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'
import type { TApiPromise, TQueryOpts } from '@/types/api'
import type { TStatus, TTrendDirection } from '@/types/index'

// Artist Api Types

export type TArtistDashboardSummary = {
  generatedAt: Date
  rangeInDays: number
  overview: Array<{
    label: string
    value: number
    change: {
      percentage: number
      absolute: number
      trend: TTrendDirection
      referenceWindowInDays: number
    }
    classname?: string
  }>
  releasePipeline: {
    statuses: Array<{
      status: TStatus
      value: number
    }>
    visibility: Array<{
      label: 'Public' | 'Private'
      value: number
    }>
  }
  playlistPresence: {
    owned: number
    likes: number
    featuring: number
  }
  catalogStats: {
    total: number
    public: number
    private: number
    listens: number
    collaborations: number
  }
  engagement: {
    trackLikes: {
      current: number
      previous: number
      total: number
    }
    playlistAdds: {
      current: number
      previous: number
      total: number
    }
  }
  timeline: {
    points: Array<{
      date: string
      tracks: number
      trackLikes: number
      playlistAdds: number
    }>
  }
  topEntities: {
    tracks: Array<{
      id: string
      title: string
      listens: number
      likes: number
      status: TStatus
      createdAt: string
      posterKey: string | null
    }>
    playlists: Array<{
      id: string
      name: string
      likes: number
      trackCount: number
      posterKey: string | null
    }>
  }
  reviewQueue: Array<{
    id: string
    title: string
    status: TStatus
    submittedAt: string
    posterKey: string | null
  }>
}

type TGetArtistDashboardSummaryParams = {
  lastNDays?: number
}

// Artist Api Endpoints
const getArtistDashboardSummary = (
  params?: TGetArtistDashboardSummaryParams
): TApiPromise<TArtistDashboardSummary> => {
  return api.get('/artist/home/dashboard-summary', { params })
}

// Artist Api Hooks
export const useGetArtistDashboardSummary = (
  params?: TGetArtistDashboardSummaryParams,
  opts?: TQueryOpts<TArtistDashboardSummary>
) => {
  return useQuery({
    queryKey: ['useGetArtistDashboardSummary', params],
    queryFn: () => getArtistDashboardSummary(params),
    ...opts
  })
}
