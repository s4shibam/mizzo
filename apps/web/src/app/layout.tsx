import type { Metadata } from 'next'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { LuSmartphone } from 'react-icons/lu'

import { APP_SLUG_CAP, cn } from '@mizzo/utils'

import { Branding } from '@/components/common/branding'
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
          <main className="flex h-screen w-full flex-col items-center justify-center gap-8 p-10 md:hidden">
            <Branding />

            <div className="space-y-8">
              <div className="space-y-2 text-center">
                <h3 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  Mobile Version Coming Soon
                </h3>
                <p className="text-lg">Please use a larger screen</p>
              </div>

              <div className="relative mx-auto size-24">
                <div className="bg-primary/10 absolute inset-0 animate-pulse rounded-full" />

                <div className="relative grid h-full place-items-center">
                  <LuSmartphone className="text-primary size-12" />
                </div>
              </div>

              <p className="text-center text-zinc-500">
                We&apos;re working on making it perfect for mobile and tablet
                devices
              </p>
            </div>
          </main>

          <AppProviders>
            <main className="hidden min-h-screen w-full md:block">
              {children}
            </main>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout
