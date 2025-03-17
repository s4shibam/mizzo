import { type ReactNode } from 'react'

import { Button } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { cn } from '@mizzo/utils'

import { Branding } from '@/components/common/branding'
import { usePlayerContext } from '@/providers/player-provider'

export const LeftPanelMenu = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const { activeTrack } = usePlayerContext()

  return (
    <div className="bg-primary-light fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r">
      <div className="grid h-16 w-full shrink-0 place-items-center border-b">
        <Branding className="mx-auto" />
      </div>

      <div className="flex flex-col gap-1 overflow-y-auto p-4">{children}</div>

      <div className={cn('mt-auto p-4', activeTrack && 'mb-20')}>
        {!session?.user?.isPremiumUser && (
          <div className="to-primary-light from-primary/25 animate-fade-up flex flex-col rounded-lg border bg-gradient-to-br p-2.5">
            <span className="text-lg font-medium">Upgrade to Premium</span>

            <span className="pb-4 text-sm/4">
              Get access to offline music and all other premium features.
            </span>

            <Link href="/premium">
              <Button block size="large" type="primary">
                Upgrade Now
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
