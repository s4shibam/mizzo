import { useMutation, useQuery } from '@tanstack/react-query'

import type { TMediaUpdateOption } from '@mizzo/utils'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { User } from '@/types/user'

// User Api Types

type TSendSignupOtpPayload = {
  name: string
  email: string
  password: string
}

type TSignupUserPayload = {
  email: string
  userOtp: string
}

type TLoginUserPayload = {
  email: string
  password: string
}

type TUpdatePasswordPayload = {
  oldPassword: string
  newPassword: string
}

type TUpdateProfilePayload = {
  name?: string
  bio?: string
  facebook?: string
  twitter?: string
  instagram?: string
  avatarUrl?: string
  avatarUpdateOption?: TMediaUpdateOption
}

type TForgotPasswordPayload = {
  email: string
}

type TResetPasswordPayload = {
  userId: string
  resetToken: string
  password: string
}

type TSubmitArtistApplicationPayload = {
  message: string
  idProofType: string
  idProofUrl: string
}

type TArtistApplicationResponse = {
  id: string
  userId: string
  message?: string
  isApproved: boolean
  updatedAt: Date
  createdAt: Date
}

// User Api Endpoints
const sendSignupOtp = (payload: TSendSignupOtpPayload): TApiPromise => {
  return api.post('/user/send-signup-otp', payload)
}

const signupUser = (payload: TSignupUserPayload): TApiPromise => {
  return api.post('/user/signup', payload)
}

const loginUser = (
  payload: TLoginUserPayload
): TApiPromise<{ token: string }> => {
  return api.post('/user/login', payload)
}

const getMyProfile = (): TApiPromise<User> => {
  return api.get('/user/my-profile')
}

const updatePassword = (payload: TUpdatePasswordPayload): TApiPromise => {
  return api.put('/user/update-password', payload)
}

const updateProfile = (payload: TUpdateProfilePayload): TApiPromise<User> => {
  return api.put('/user/update-profile', payload)
}

const togglePublicViewOfProfile = (): TApiPromise<{
  isPublicProfile: boolean
}> => {
  return api.put('/user/public-view')
}

const forgotPassword = (payload: TForgotPasswordPayload): TApiPromise => {
  return api.post('/user/forgot-password', payload)
}

const resetPassword = (payload: TResetPasswordPayload): TApiPromise => {
  return api.put('/user/reset-password', payload)
}

const submitArtistApplication = (
  payload: TSubmitArtistApplicationPayload
): TApiPromise<{ isArtistApplicationSubmitted: boolean }> => {
  return api.post('/user/artist-application', payload)
}

const getArtistApplicationStatus =
  (): TApiPromise<TArtistApplicationResponse> => {
    return api.get('/user/artist-application-status')
  }

// User Api Hooks
export const useSendSignupOtp = (
  opts?: TMutationOpts<TSendSignupOtpPayload>
) => {
  return useMutation({
    mutationKey: ['useSendSignupOtp'],
    mutationFn: sendSignupOtp,
    ...opts
  })
}

export const useSignupUser = (opts?: TMutationOpts<TSignupUserPayload>) => {
  return useMutation({
    mutationKey: ['useSignupUser'],
    mutationFn: signupUser,
    ...opts
  })
}

export const useLoginUser = (
  opts?: TMutationOpts<TLoginUserPayload, { token: string }>
) => {
  return useMutation({
    mutationKey: ['useLoginUser'],
    mutationFn: loginUser,
    ...opts
  })
}

export const useGetMyProfile = (opts?: TQueryOpts<User>) => {
  return useQuery({
    queryKey: ['useGetMyProfile'],
    queryFn: getMyProfile,
    ...opts
  })
}

export const useUpdatePassword = (
  opts?: TMutationOpts<TUpdatePasswordPayload>
) => {
  return useMutation({
    mutationKey: ['useUpdatePassword'],
    mutationFn: updatePassword,
    ...opts
  })
}

export const useUpdateProfile = (
  opts?: TMutationOpts<TUpdateProfilePayload, User>
) => {
  return useMutation({
    mutationKey: ['useUpdateProfile'],
    mutationFn: updateProfile,
    ...opts
  })
}

export const useTogglePublicViewOfProfile = (
  opts?: TMutationOpts<void, { isPublicProfile: boolean }>
) => {
  return useMutation({
    mutationKey: ['useTogglePublicViewOfProfile'],
    mutationFn: togglePublicViewOfProfile,
    ...opts
  })
}

export const useForgotPassword = (
  opts?: TMutationOpts<TForgotPasswordPayload>
) => {
  return useMutation({
    mutationKey: ['useForgotPassword'],
    mutationFn: forgotPassword,
    ...opts
  })
}

export const useResetPassword = (
  opts?: TMutationOpts<TResetPasswordPayload>
) => {
  return useMutation({
    mutationKey: ['useResetPassword'],
    mutationFn: resetPassword,
    ...opts
  })
}

export const useSubmitArtistApplication = (
  opts?: TMutationOpts<
    TSubmitArtistApplicationPayload,
    { isArtistApplicationSubmitted: boolean }
  >
) => {
  return useMutation({
    mutationKey: ['useSubmitArtistApplication'],
    mutationFn: submitArtistApplication,
    ...opts
  })
}

export const useGetArtistApplicationStatus = (
  opts?: TQueryOpts<TArtistApplicationResponse>
) => {
  return useQuery({
    queryKey: ['useGetArtistApplicationStatus'],
    queryFn: getArtistApplicationStatus,
    ...opts
  })
}
