'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import { CookiesProvider } from 'react-cookie'
import { Toaster } from 'react-hot-toast'

import { colors } from '@mizzo/tailwind-config/theme'

import { queryClient } from '@/services/tanstack'

import { AntdProvider } from './antd-provider'
import { PlayerProvider } from './player-provider'

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <QueryClientProvider client={queryClient}>
          <NextTopLoader color={colors.primary.DEFAULT} showSpinner={false} />
          <AntdProvider>
            <PlayerProvider>{children}</PlayerProvider>
          </AntdProvider>
          <Toaster
            containerStyle={{
              top: '8px'
            }}
            position="top-center"
            toastOptions={{
              style: {
                maxWidth: '32rem',
                boxShadow: 'none',
                color: colors.text.black,
                border: `1px solid ${colors.border.DEFAULT}`
              },
              iconTheme: {
                primary: colors.primary.DEFAULT,
                secondary: colors.text.white
              },
              duration: 2500
            }}
          />
          <ReactQueryDevtools buttonPosition="top-left" initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </SessionProvider>
  )
}

export default AppProviders
