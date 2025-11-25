import Image from 'next/image'

import { cn } from '@mizzo/utils'

import MIZZO_PRIMARY_ANIMATED from '@/assets/logos/mizzo-primary-animated.svg'

type LoaderProps = {
  className?: string
  fullScreen?: boolean
  loading?: boolean
  row?: boolean
  text?: string
}

export const Loader = ({
  className,
  loading = true,
  fullScreen = false,
  row = true,
  text = 'Loading...'
}: LoaderProps) => {
  if (!loading) {
    return null
  }

  return (
    <div
      aria-busy="true"
      aria-label={text}
      className={cn(
        'flex size-full flex-col items-center justify-center gap-x-2 gap-y-1 p-4',
        {
          'fixed inset-0 z-50 bg-white pt-0': fullScreen,
          'flex-row': row
        },
        className
      )}
      role="alert"
    >
      <div className="bg-primary/5 grid size-8 place-items-center rounded-lg">
        <Image
          priority
          alt="Mizzo"
          className="size-5"
          draggable={false}
          height={32}
          src={MIZZO_PRIMARY_ANIMATED}
          width={32}
        />
      </div>

      <p className="text-base font-medium">{text}</p>
    </div>
  )
}
