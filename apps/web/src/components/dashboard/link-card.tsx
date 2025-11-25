import type { StaticImageData } from 'next/image'
import Link from 'next/link'

import { cn } from '@mizzo/utils'

import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { s3GetUrlFromKey } from '@/lib/utils'

export type TLinkCardProps = {
  rank: number
  name: string
  meta: string
  imageKey: string | null
  fallbackImage: StaticImageData
  href: string
  stats: {
    value: string | number
    label: string
  }[]
  className?: string
}

export const LinkCard = ({
  rank,
  name,
  meta,
  imageKey,
  fallbackImage,
  href,
  stats,
  className
}: TLinkCardProps) => {
  return (
    <Link
      className={cn(
        'text-text-black hover:border-primary/50 group relative flex flex-col gap-2 overflow-hidden rounded-lg border bg-white p-4 transition-all',
        className
      )}
      href={href}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <ImageWithFallback
          alt={name}
          className="size-10 shrink-0 rounded-full object-cover"
          draggable={false}
          fallbackSrc={fallbackImage}
          height={40}
          src={s3GetUrlFromKey(imageKey)}
          width={40}
        />
        <div className="min-w-0 flex-1 pr-8">
          <p className="truncate font-semibold">{name}</p>
          <p className="truncate text-xs text-zinc-500">{meta}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm">
        {stats.map((stat, index) => (
          <p key={index} className="font-bold">
            {stat.value}{' '}
            <span className="text-xs text-zinc-500">{stat.label}</span>
          </p>
        ))}
      </div>

      <span className="absolute right-4 top-4 shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-bold text-zinc-600">
        #{rank}
      </span>
    </Link>
  )
}
