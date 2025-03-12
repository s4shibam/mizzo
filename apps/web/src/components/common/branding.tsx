import Image from 'next/image'
import Link from 'next/link'

import { APP_SLUG_CAP, cn } from '@mizzo/utils'

import MIZZO_LOGO from '@/assets/logos/mizzo-primary.svg'

type BrandingProps = {
  className?: string
  size?: 'large' | 'small'
}

export const Branding = ({ className, size = 'large' }: BrandingProps) => {
  return (
    <Link
      className={cn(
        'flex w-fit cursor-pointer select-none items-center justify-center gap-1',
        className
      )}
      href="/"
    >
      <div className="bg-background grid size-8 place-items-center rounded-lg xl:size-9">
        <Image
          alt="Logo"
          className="size-7 translate-x-px xl:size-8"
          draggable={false}
          src={MIZZO_LOGO}
        />
      </div>

      <span
        className={cn('text-primary font-semibold capitalize', {
          'text-2xl': size === 'large',
          'text-xl': !(size === 'large')
        })}
      >
        {APP_SLUG_CAP}
      </span>
    </Link>
  )
}
