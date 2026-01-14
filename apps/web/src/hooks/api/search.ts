import { useQuery } from '@tanstack/react-query'

import type { TPaginationParams } from '@mizzo/utils'

import { api } from '@/services/api'
import type { TApiPromise, TQueryOpts } from '@/types/api'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'
import type { User } from '@/types/user'

// Search Api Types

type TSearchParams = {
  search: string
  as?: 'artist' | 'user' | 'owner'
} & TPaginationParams

// Search Api Endpoints

const searchUserByUserId = (params: TSearchParams): TApiPromise<User> => {
  const { search, as } = params
  return api.get(`/search/user/${search}`, {
    params: {
      as
    }
  })
}

const searchUsersByUserName = (params: TSearchParams): TApiPromise<User[]> => {
  const { search } = params
  return api.get(`/search/user/name/${search}`)
}

const searchTrackByTrackId = (params: TSearchParams): TApiPromise<Track> => {
  const { search, as } = params

  return api.get(`/search/track/${search}`, {
    params: {
      as
    }
  })
}

const searchTracksByTrackName = (
  params: TSearchParams
): TApiPromise<Track[]> => {
  const { search } = params
  return api.get(`/search/track/name/${search}`)
}

const searchTracksByUserId = (params: TSearchParams): TApiPromise<Track[]> => {
  const { search } = params
  return api.get(`/search/user/${search}/track`)
}

const searchPlaylistByPlaylistId = (
  params: TSearchParams
): TApiPromise<Playlist> => {
  const { search, as } = params
  return api.get(`/search/playlist/${search}`, { params: { as } })
}

const searchPlaylistsAsCollection = (
  params: TSearchParams & { limit?: number }
): TApiPromise<{
  heading: string
  playlists: Playlist[]
}> => {
  const { search, limit } = params
  return api.get(`/search/playlist/collections/${search}`, {
    params: { limit }
  })
}

const searchPlaylistsByPlaylistName = (
  params: TSearchParams
): TApiPromise<Playlist[]> => {
  const { search } = params
  return api.get(`/search/playlist/name/${search}`)
}

const searchPlaylistsByUserId = (
  params: TSearchParams
): TApiPromise<Playlist[]> => {
  const { search } = params
  return api.get(`/search/user/${search}/playlist`)
}

const getTopTracks = (params: {
  limit: number
}): TApiPromise<{
  heading: string
  tracks: Track[]
}> => {
  const { limit } = params
  return api.get(`/search/track/top`, {
    params: { limit }
  })
}

const getTopArtists = (params: {
  limit: number
}): TApiPromise<{
  heading: string
  artists: User[]
}> => {
  const { limit } = params
  return api.get(`/search/artist/top`, {
    params: { limit }
  })
}

// Search Api Hooks
export const useSearchUserByUserId = (
  params: TSearchParams,
  opts?: TQueryOpts<User>
) => {
  return useQuery({
    queryKey: ['useSearchUserByUserId', params],
    queryFn: () => searchUserByUserId(params),
    ...opts
  })
}

export const useSearchUsersByUserName = (
  params: TSearchParams,
  opts?: TQueryOpts<User[]>
) => {
  return useQuery({
    queryKey: ['useSearchUsersByUserName', params],
    queryFn: () => searchUsersByUserName(params),
    enabled: false,
    ...opts
  })
}

export const useSearchTrackByTrackId = (
  params: TSearchParams,
  opts?: TQueryOpts<Track>
) => {
  return useQuery({
    queryKey: ['useSearchTrackByTrackId', params],
    queryFn: () => searchTrackByTrackId(params),
    ...opts
  })
}

export const useSearchTracksByTrackName = (
  params: TSearchParams,
  opts?: TQueryOpts<Track[]>
) => {
  return useQuery({
    queryKey: ['useSearchTracksByTrackName', params],
    queryFn: () => searchTracksByTrackName(params),
    enabled: false,
    ...opts
  })
}

export const useSearchTracksByUserId = (
  params: TSearchParams,
  opts?: TQueryOpts<Track[]>
) => {
  return useQuery({
    queryKey: ['useSearchTracksByUserId', params],
    queryFn: () => searchTracksByUserId(params),
    ...opts
  })
}

export const useSearchPlaylistByPlaylistId = (
  params: TSearchParams,
  opts?: TQueryOpts<Playlist>
) => {
  return useQuery({
    queryKey: ['useSearchPlaylistByPlaylistId', params],
    queryFn: () => searchPlaylistByPlaylistId(params),
    ...opts
  })
}

export const useSearchPlaylistsAsCollection = (
  params: TSearchParams & { limit?: number },
  opts?: TQueryOpts<{
    heading: string
    playlists: Playlist[]
  }>
) => {
  return useQuery({
    queryKey: ['useSearchPlaylistsAsCollection', params],
    queryFn: () => searchPlaylistsAsCollection(params),
    ...opts
  })
}

export const useSearchPlaylistsByPlaylistName = (
  params: TSearchParams,
  opts?: TQueryOpts<Playlist[]>
) => {
  return useQuery({
    queryKey: ['useSearchPlaylistsByPlaylistName', params],
    queryFn: () => searchPlaylistsByPlaylistName(params),
    enabled: false,
    ...opts
  })
}

export const useSearchPlaylistsByUserId = (
  params: TSearchParams,
  opts?: TQueryOpts<Playlist[]>
) => {
  return useQuery({
    queryKey: ['useSearchPlaylistsByUserId', params],
    queryFn: () => searchPlaylistsByUserId(params),
    ...opts
  })
}

export const useGetTopTracks = (
  params: { limit: number },
  opts?: TQueryOpts<{
    heading: string
    tracks: Track[]
  }>
) => {
  return useQuery({
    queryKey: ['useGetTopTracks', params],
    queryFn: () => getTopTracks(params),
    ...opts
  })
}

export const useGetTopArtists = (
  params: { limit: number },
  opts?: TQueryOpts<{
    heading: string
    artists: User[]
  }>
) => {
  return useQuery({
    queryKey: ['useGetTopArtists', params],
    queryFn: () => getTopArtists(params),
    ...opts
  })
}
