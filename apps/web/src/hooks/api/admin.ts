import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { Playlist } from '@/types/playlist'
import { Track } from '@/types/track'
import { ArtistApplication, User } from '@/types/user'

// Admin Api Types

type TGetUsersByEmailParams = {
  email: string
  take?: number
  isAdmin?: boolean
}

type TUpdateUserPayload = {
  id: string
  data: Partial<User>
}

type TUpdateTrackPayload = {
  id: string
  data: Partial<Track>
}

type TUpdatePlaylistPayload = {
  id: string
  data: Partial<Playlist>
}

type TManageArtistApplicationPayload = {
  userId: string
  isApproved: boolean | null
}

type TAdminDashboardSummary = {
  userCount: {
    total: number
    artist: number
    normal: number
    public: number
    private: number
    admin: number
  }
  trackCount: {
    total: number
    public: number
    private: number
    pending: number
    processing: number
    failed: number
    reviewing: number
    published: number
    blocked: number
  }
  playlistCount: {
    total: number
    public: number
    private: number
    reviewing: number
    published: number
    blocked: number
  }
  lastNDaysCount: {
    n: number
    users: number
    tracks: number
    playlists: number
    trackLikes: number
    playlistLikes: number
  }
}

// Admin Api Endpoints
const getAdminDashboardSummary = (): TApiPromise<TAdminDashboardSummary> => {
  return api.get('/admin/home/dashboard-summary')
}

const getAllUsers = (): TApiPromise<User[]> => {
  return api.get('/admin/user/all')
}

const getUsersByEmail = (
  params: TGetUsersByEmailParams
): TApiPromise<User[]> => {
  const { email, take, isAdmin } = params
  return api.get(`/admin/user/email/${email}`, { params: { take, isAdmin } })
}

const updateUser = (payload: TUpdateUserPayload): TApiPromise => {
  return api.put(`/admin/user/${payload.id}`, payload.data)
}

const getAllTracks = (): TApiPromise<Track[]> => {
  return api.get('/admin/track/all')
}

const updateTrack = (payload: TUpdateTrackPayload): TApiPromise => {
  return api.put(`/admin/track/${payload.id}`, payload.data)
}

const getAllPlaylists = (): TApiPromise<Playlist[]> => {
  return api.get('/admin/playlist/all')
}

const updatePlaylist = (payload: TUpdatePlaylistPayload): TApiPromise => {
  return api.put(`/admin/playlist/${payload.id}`, payload.data)
}

const getAllAdmins = (): TApiPromise<User[]> => {
  return api.get('/admin/admin/all')
}

const updateAdmin = (payload: { id: string }): TApiPromise => {
  return api.put(`/admin/admin/${payload.id}`)
}

const getAllArtistApplications = (): TApiPromise<ArtistApplication[]> => {
  return api.get('/admin/artist-applications')
}

const manageArtistApplication = (
  payload: TManageArtistApplicationPayload
): TApiPromise => {
  return api.put(`/admin/artist-application/${payload.userId}`, payload)
}

// Admin Api Hooks
export const useGetAdminDashboardSummary = (
  opts?: TQueryOpts<TAdminDashboardSummary>
) => {
  return useQuery({
    queryKey: ['useGetAdminDashboardSummary'],
    queryFn: getAdminDashboardSummary,
    ...opts
  })
}

export const useGetAllUsers = (opts?: TQueryOpts<User[]>) => {
  return useQuery({
    queryKey: ['useGetAllUsers'],
    queryFn: getAllUsers,
    ...opts
  })
}

export const useGetUsersByEmail = (
  params: TGetUsersByEmailParams,
  opts?: TQueryOpts<User[]>
) => {
  return useQuery({
    queryKey: ['useGetUsersByEmail', params],
    queryFn: () => getUsersByEmail(params),
    ...opts
  })
}

export const useUpdateUser = (opts?: TMutationOpts<TUpdateUserPayload>) => {
  return useMutation({
    mutationKey: ['useUpdateUser'],
    mutationFn: updateUser,
    ...opts
  })
}

export const useGetAllTracks = (opts?: TQueryOpts<Track[]>) => {
  return useQuery({
    queryKey: ['useGetAllTracks'],
    queryFn: getAllTracks,
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

export const useGetAllPlaylists = (opts?: TQueryOpts<Playlist[]>) => {
  return useQuery({
    queryKey: ['useGetAllPlaylists'],
    queryFn: getAllPlaylists,
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

export const useGetAllAdmins = (opts?: TQueryOpts<User[]>) => {
  return useQuery({
    queryKey: ['useGetAllAdmins'],
    queryFn: getAllAdmins,
    ...opts
  })
}

export const useUpdateAdmin = (opts?: TMutationOpts<{ id: string }>) => {
  return useMutation({
    mutationKey: ['useUpdateAdmin'],
    mutationFn: updateAdmin,
    ...opts
  })
}

export const useGetAllArtistApplications = (
  opts?: TQueryOpts<ArtistApplication[]>
) => {
  return useQuery({
    queryKey: ['useGetAllArtistApplications'],
    queryFn: getAllArtistApplications,
    ...opts
  })
}

export const useManageArtistApplication = (
  opts?: TMutationOpts<TManageArtistApplicationPayload>
) => {
  return useMutation({
    mutationKey: ['useManageArtistApplication'],
    mutationFn: manageArtistApplication,
    ...opts
  })
}
