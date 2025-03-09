import { useMutation, useQuery } from '@tanstack/react-query'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

// Track Api Types

type TTrackId = {
  trackId: string
}

type TUploadTrackPayload = {
  id: string
  title: string
  language: string
  duration: number
  tags?: string[]
  posterUrl: string
  trackUrl: string
  secondaryArtistIds?: string[]
}

type TUpdateTrackPayload = {
  trackId: string
  title?: string
  language?: string
  tags?: string[]
  isPublic?: boolean
  posterUpdateOption?: TMediaUpdateOption
  secondaryArtistIds?: string[]
  lyrics?: string
  posterUrl?: string
  trackUrl?: string
}

// Track Api Endpoints
const uploadTrack = (
  payload: TUploadTrackPayload
): TApiPromise<{ id: string; title: string }> => {
  return api.post('/track/upload', payload)
}

const updateTrack = ({
  trackId,
  ...payload
}: TUpdateTrackPayload): TApiPromise => {
  return api.put(`/track/${trackId}`, payload)
}

const getMyUploads = (): TApiPromise<Playlist> => {
  return api.get('/track/my-uploads')
}

const getMyCollaboratedTracks = (): TApiPromise<Track[]> => {
  return api.get('/track/my-collaborations')
}

const getLikeStatusOfTrack = ({
  trackId
}: TTrackId): TApiPromise<{
  isLiked: boolean
}> => {
  return api.get(`/track/${trackId}/like`)
}

const toggleLikeOfTrack = ({ trackId }: TTrackId): TApiPromise => {
  return api.put(`/track/${trackId}/like`)
}

const togglePublicViewOfTrack = ({ trackId }: TTrackId): TApiPromise => {
  return api.put(`/track/${trackId}/public-view`)
}

const incrementTrackListeningCount = ({ trackId }: TTrackId): TApiPromise => {
  return api.put(`/track/${trackId}/listen`)
}

const deleteTrackById = ({ trackId }: TTrackId): TApiPromise => {
  return api.delete(`/track/${trackId}`)
}

// Hooks
export const useUploadTrack = (
  opts?: TMutationOpts<TUploadTrackPayload, { id: string; title: string }>
) => {
  return useMutation({
    mutationKey: ['useUploadTrack'],
    mutationFn: uploadTrack,
    ...opts
  })
}

export const useUpdateTrack = (opts?: TMutationOpts<TUpdateTrackPayload>) => {
  return useMutation({
    mutationKey: ['useUpdateTrack'],
    mutationFn: updateTrack,
    ...opts
  })
}

export const useGetMyUploads = (opts?: TQueryOpts<Playlist>) => {
  return useQuery({
    queryKey: ['useGetMyUploads'],
    queryFn: getMyUploads,
    ...opts
  })
}

export const useGetMyCollaboratedTracks = (opts?: TQueryOpts<Track[]>) => {
  return useQuery({
    queryKey: ['useGetMyCollaboratedTracks'],
    queryFn: getMyCollaboratedTracks,
    ...opts
  })
}

export const useGetLikeStatusOfTrack = (
  params: TTrackId,
  opts?: TQueryOpts<{ isLiked: boolean }>
) => {
  return useQuery({
    queryKey: ['useGetLikeStatusOfTrack', params],
    queryFn: () => getLikeStatusOfTrack(params),
    ...opts
  })
}

export const useToggleLikeOfTrack = (opts?: TMutationOpts<TTrackId>) => {
  return useMutation({
    mutationKey: ['useToggleLikeOfTrack'],
    mutationFn: toggleLikeOfTrack,
    ...opts
  })
}

export const useTogglePublicViewOfTrack = (opts?: TMutationOpts<TTrackId>) => {
  return useMutation({
    mutationKey: ['useTogglePublicViewOfTrack'],
    mutationFn: togglePublicViewOfTrack,
    ...opts
  })
}

export const useIncrementTrackListeningCount = (
  opts?: TMutationOpts<TTrackId>
) => {
  return useMutation({
    mutationKey: ['useIncrementTrackListeningCount'],
    mutationFn: incrementTrackListeningCount,
    ...opts
  })
}

export const useDeleteTrackById = (opts?: TMutationOpts<TTrackId>) => {
  return useMutation({
    mutationKey: ['useDeleteTrackById'],
    mutationFn: deleteTrackById,
    ...opts
  })
}
