import { User as AppUser } from './user'

declare module 'next-auth' {
  type User = AppUser
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  type JWT = AppUser
}
