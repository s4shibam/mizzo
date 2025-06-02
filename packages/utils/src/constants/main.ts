import { capitalize } from '../functions'

export type TNodeEnv = 'development' | 'production' | 'test'

export const NODE_ENV: TNodeEnv =
  (process.env.NODE_ENV as TNodeEnv) || 'development'

export const APP_SLUG = process.env.NEXT_PUBLIC_APP_SLUG || 'app'

export const APP_SLUG_CAP = capitalize(APP_SLUG)

export const WEB_URL =
  process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'

export const API_PORT = Number(process.env.API_PORT || '8000')

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || `http://localhost:${API_PORT}`
