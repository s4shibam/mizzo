import { DefaultUser } from 'next-auth'

export type User = {
  id: string
  token: string
  name: string
  email?: string
  isAdmin?: boolean
  isArtist: boolean
  isPremiumUser?: boolean
  isPublicProfile: boolean
  createdAt: Date
  updatedAt: Date
  profile: UserProfile
  isArtistApplicationSubmitted?: boolean
  _count?: User_Count
} & DefaultUser

export type User_Count = {
  primaryTracks: number
  secondaryTracks: number
  likedTracks: number
  ownedPlaylists: number
  likedPlaylists: number
}

export type UserProfile = {
  avatarKey: string | null
  facebook: string | null
  twitter: string | null
  instagram: string | null
  bio: string | null
}

export type Artist = Pick<User, 'id' | 'name' | 'profile'>

export type ArtistApplication = {
  id: string
  userId: string
  user?: Partial<User>
  message?: string
  isApproved: string
  idProofType: string
  idProofKey: string
  createdAt: Date
  updatedAt: Date
}
