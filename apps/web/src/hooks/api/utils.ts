import { useMutation } from '@tanstack/react-query'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts } from '@/types/api'

// Utils Api Types

type TCreateUploadUrlPayload = {
  directory:
    | 'user-data'
    | 'raw-track'
    | 'track-poster'
    | 'playlist-poster'
    | 'transcoded-track'
  fileName: string
  fileSize: number
  fileType: string
  suffix?: string
}

type TCreateDownloadUrlPayload = {
  url: string
}

// Utils Api Endpoints

const createUploadUrl = (
  payload: TCreateUploadUrlPayload
): TApiPromise<{ uploadUrl: string }> => {
  return api.post('/utils/upload-url', payload)
}

const createDownloadUrl = (
  payload: TCreateDownloadUrlPayload
): TApiPromise<{ downloadUrl: string }> => {
  return api.post('/utils/download-url', payload)
}

// Utils Api Hooks

export const useCreateUploadUrl = (
  opts?: TMutationOpts<TCreateUploadUrlPayload, { uploadUrl: string }>
) => {
  return useMutation({
    mutationKey: ['useCreateUploadUrl'],
    mutationFn: createUploadUrl,
    ...opts
  })
}

export const useCreateDownloadUrl = (
  opts?: TMutationOpts<TCreateDownloadUrlPayload, { downloadUrl: string }>
) => {
  return useMutation({
    mutationKey: ['useCreateDownloadUrl'],
    mutationFn: createDownloadUrl,
    ...opts
  })
}
