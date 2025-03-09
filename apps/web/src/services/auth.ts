import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { API_URL } from '@mizzo/utils'

import { env } from '@/constants/env'

import { api } from './api'

export const authOptions: NextAuthOptions = {
  secret: env.nextAuthSecret,

  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/login'
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credentials not found')
        }

        const payload = {
          email: credentials.email,
          password: credentials.password
        }

        try {
          const response = await api.post(API_URL + '/user/login', payload)

          return response.data
        } catch (error: unknown) {
          throw new Error((error as Error).message ?? 'Something went wrong')
        }
      }
    })
  ],

  callbacks: {
    signIn({ user, account }) {
      if (account?.provider === 'credentials' && user) {
        return true
      }

      return false
    },

    jwt({ user, token, session, trigger }) {
      if (trigger === 'update' && session) {
        return { ...token, ...user, ...session }
      }

      if (user) {
        return { ...token, ...user }
      }

      return token
    },

    session({ session, token }) {
      session.user = token

      return session
    },

    redirect({ baseUrl }) {
      return baseUrl
    }
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },

  debug: env.nodeEnv !== 'prod'
}
