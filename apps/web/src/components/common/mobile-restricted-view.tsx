'use client'

import { usePathname } from 'next/navigation'
import { LuSmartphone } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { Branding } from './branding'

const MobileRestrictedView = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const doNotAllowMobile = pathname !== '/' && pathname !== '/premium'

  return (
    <>
      <main
        className={cn(
          'flex h-screen w-full flex-col items-center justify-center gap-8 p-10',
          doNotAllowMobile ? 'md:hidden' : 'hidden'
        )}
      >
        <Branding href="/" />

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

      <main
        className={cn(
          'min-h-screen w-full',
          doNotAllowMobile ? 'hidden md:block' : 'block'
        )}
      >
        {children}
      </main>
    </>
  )
}

export default MobileRestrictedView
