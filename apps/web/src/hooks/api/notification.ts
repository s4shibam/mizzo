import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/services/api'
import type { TApiPromise, TMutationOpts, TQueryOpts } from '@/types/api'
import { Notification } from '@/types/index'

// Notification Api Types

type TGetAllNotificationsResponse = {
  notifications: Notification[]
  unreadCount: number
}

type TUpdateNotificationPayload = {
  id: number
  action: 'read' | 'delete'
}

// Notification Api Endpoints

const getAllNotifications = (): TApiPromise<TGetAllNotificationsResponse> => {
  return api.get('/notification/all')
}

const updateNotification = (
  payload: TUpdateNotificationPayload
): TApiPromise => {
  const { id, action } = payload

  return api.put(`/notification/${id}`, { action })
}

// Notification Api Hooks

export const useGetAllNotifications = (
  opts?: TQueryOpts<TGetAllNotificationsResponse>
) => {
  return useQuery({
    queryKey: ['useGetAllNotifications'],
    queryFn: getAllNotifications,
    ...opts
  })
}

export const useUpdateNotification = (
  opts?: TMutationOpts<TUpdateNotificationPayload>
) => {
  return useMutation({
    mutationKey: ['useUpdateNotification'],
    mutationFn: updateNotification,
    ...opts
  })
}
