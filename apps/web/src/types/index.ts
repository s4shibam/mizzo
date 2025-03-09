import '@tanstack/react-query'

import type { TError } from '@mizzo/utils'

import type { User } from './user'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: TError
  }
}

export type TStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'FAILED'
  | 'REVIEWING'
  | 'PUBLISHED'
  | 'BLOCKED'

export type Notification = {
  id: number
  userId: string
  user: User
  tag: string
  message: string
  readAt: Date | null
  createdAt: Date
}
