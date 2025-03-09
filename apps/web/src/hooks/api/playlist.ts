import { useMutation, useQuery } from '@tanstack/react-query'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { Playlist } from '@/types/playlist'

// Playlist Api Types

type TPlaylistId = {
  playlistId: string
}

type TCreatePlaylistPayload = {
  name: string
}

type TUpdatePlaylistPayload = {
  playlistId: string
  name: string
  description?: string
  isPublic: boolean
  posterUrl?: string
  posterUpdateOption: TMediaUpdateOption
}

type TAddTrackToPlaylistPayload = {
  trackId: string
  playlistId: string
}

type TDeleteTrackFromPlaylistParams = {
  trackId: string
  playlistId: string
}

// Playlist Api Endpoints

const createPlaylist = (payload: TCreatePlaylistPayload): TApiPromise => {
  return api.post('/playlist/create', payload)
}

const updatePlaylist = (payload: TUpdatePlaylistPayload): TApiPromise => {
  const {
    playlistId,
    name,
    description,
    isPublic,
    posterUrl,
    posterUpdateOption
  } = payload

  return api.put(`/playlist/${playlistId}`, {
    name,
    description,
    isPublic,
    posterUrl,
    posterUpdateOption
  })
}

const addTrackToPlaylist = (
  payload: TAddTrackToPlaylistPayload
): TApiPromise => {
  return api.post('/playlist/add-track', payload)
}

const getMyPlaylists = (): TApiPromise<Playlist[]> => {
  return api.get('/playlist/my-playlists')
}

const getLikedTracks = (): TApiPromise<Playlist> => {
  return api.get('/playlist/liked-tracks')
}

const getLikedPlaylists = (): TApiPromise<Playlist[]> => {
  return api.get('/playlist/liked-playlists')
}

const getLikeStatusOfPlaylist = (
  params: TPlaylistId
): TApiPromise<{
  isLiked: boolean
}> => {
  const { playlistId } = params
  return api.get(`/playlist/${playlistId}/like`)
}

const toggleLikeOfPlaylist = ({ playlistId }: TPlaylistId): TApiPromise => {
  return api.put(`/playlist/${playlistId}/like`)
}

const togglePublicViewOfPlaylist = ({
  playlistId
}: TPlaylistId): TApiPromise => {
  return api.put(`/playlist/${playlistId}/public-view`)
}

const deletePlaylistById = ({ playlistId }: TPlaylistId): TApiPromise => {
  return api.delete(`/playlist/${playlistId}`)
}

const removeTrackFromPlaylist = ({
  playlistId,
  trackId
}: TDeleteTrackFromPlaylistParams): TApiPromise => {
  return api.delete('/playlist/remove-track', {
    params: {
      playlistId,
      trackId
    }
  })
}

// Playlist Api Hooks

export const useCreatePlaylist = (
  opts?: TMutationOpts<TCreatePlaylistPayload>
) => {
  return useMutation({
    mutationKey: ['useCreatePlaylist'],
    mutationFn: createPlaylist,
    ...opts
  })
}

export const useUpdatePlaylist = (
  opts?: TMutationOpts<TUpdatePlaylistPayload>
) => {
  return useMutation({
    mutationKey: ['useUpdatePlaylist'],
    mutationFn: updatePlaylist,
    ...opts
  })
}

export const useAddTrackToPlaylist = (
  opts?: TMutationOpts<TAddTrackToPlaylistPayload>
) => {
  return useMutation({
    mutationKey: ['useAddTrackToPlaylist'],
    mutationFn: addTrackToPlaylist,
    ...opts
  })
}

export const useGetMyPlaylists = (opts?: TQueryOpts<Playlist[]>) => {
  return useQuery({
    queryKey: ['useGetMyPlaylists'],
    queryFn: getMyPlaylists,
    ...opts
  })
}

export const useGetLikedTracks = (opts?: TQueryOpts<Playlist>) => {
  return useQuery({
    queryKey: ['useGetLikedTracks'],
    queryFn: getLikedTracks,
    ...opts
  })
}

export const useGetLikedPlaylists = (opts?: TQueryOpts<Playlist[]>) => {
  return useQuery({
    queryKey: ['useGetLikedPlaylists'],
    queryFn: getLikedPlaylists,
    ...opts
  })
}

export const useGetLikeStatusOfPlaylist = (
  params: TPlaylistId,
  opts?: TQueryOpts<{ isLiked: boolean }>
) => {
  return useQuery({
    queryKey: ['useGetLikeStatusOfPlaylist', params],
    queryFn: () => getLikeStatusOfPlaylist(params),
    ...opts
  })
}

export const useToggleLikeOfPlaylist = (opts?: TMutationOpts<TPlaylistId>) => {
  return useMutation({
    mutationKey: ['useToggleLikeOfPlaylist'],
    mutationFn: toggleLikeOfPlaylist,
    ...opts
  })
}

export const useTogglePublicViewOfPlaylist = (
  opts?: TMutationOpts<TPlaylistId>
) => {
  return useMutation({
    mutationKey: ['useTogglePublicViewOfPlaylist'],
    mutationFn: togglePublicViewOfPlaylist,
    ...opts
  })
}

export const useDeletePlaylistById = (opts?: TMutationOpts<TPlaylistId>) => {
  return useMutation({
    mutationKey: ['useDeletePlaylistById'],
    mutationFn: deletePlaylistById,
    ...opts
  })
}

export const useRemoveTrackFromPlaylist = (
  opts?: TMutationOpts<TPlaylistId>
) => {
  return useMutation({
    mutationKey: ['useRemoveTrackFromPlaylist'],
    mutationFn: removeTrackFromPlaylist,
    ...opts
  })
}
