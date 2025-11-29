import { User, UserProfile } from '@mizzo/prisma'

declare global {
  namespace Express {
    export interface Request {
      user: User & { profile: UserProfile | null }
      id: string
    }
  }
}

export {}
