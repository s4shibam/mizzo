import type { Metadata } from 'next'

import { AntdRegistry } from '@ant-design/nextjs-registry'

import { APP_SLUG_CAP, cn } from '@mizzo/utils'

import MobileRestrictedView from '@/components/common/mobile-restricted-view'
import AppProviders from '@/providers/app-providers'
import { inter, outfit } from '@/styles/fonts'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: `${APP_SLUG_CAP} - Where music flows`,
  description: `${APP_SLUG_CAP} - Where music flows`
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      className={cn(outfit.variable, inter.variable, 'font-sans antialiased')}
      lang="en"
    >
      <body>
        <AntdRegistry>
          <AppProviders>
            <MobileRestrictedView>{children}</MobileRestrictedView>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  )
}
export default RootLayout
