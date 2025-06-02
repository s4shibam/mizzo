import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'

import { API_URL } from '@mizzo/utils'

import { env } from '@/constants/env'

// Custom Axios instance with common configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
})

// Interceptors
api.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {}
    const session = await getSession()

    if (session?.user?.token && !config.headers.Authorization) {
      const authToken = `Bearer ${session.user.token}`
      config.headers.Authorization = authToken
    }
    return config
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error)

    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    if (env.nodeEnv === 'development') {
      console.log('[API Response]', response)
    }

    return response.data
  },
  (error: AxiosError) => {
    console.error('[API Response Error]', error?.response?.data)

    return Promise.reject(error?.response?.data)
  }
)

export { api }
