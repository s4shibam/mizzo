import type { IconType } from 'react-icons/lib'

import { cn } from '@mizzo/utils'

import { EmptyState } from './empty-state'
import { LinkCard, type TLinkCardProps } from './link-card'

export type EntityColumnProps = {
  className: string
  emptyMessage?: string
  icon: IconType
  items?: TLinkCardProps[]
  title: string
}

export const EntityColumn = ({
  className,
  emptyMessage,
  icon,
  items,
  title
}: EntityColumnProps) => {
  const Icon = icon

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div
          className={cn('text-text-black rounded-lg border p-1.5', className)}
        >
          <Icon className="size-4" />
        </div>
        <span className="text-xs font-semibold uppercase text-zinc-500">
          {title}
        </span>
      </div>
      <div className="space-y-2">
        {items?.map((item, idx) => {
          return (
            <LinkCard
              key={item.name}
              className={className}
              fallbackImage={item.fallbackImage}
              href={item.href}
              imageKey={item.imageKey}
              meta={item.meta}
              name={item.name}
              rank={idx + 1}
              stats={item.stats}
            />
          )
        })}

        {(!items || items?.length === 0) && (
          <div className="flex min-h-56 items-center justify-center rounded-lg border">
            <EmptyState description={emptyMessage ?? 'No items'} />
          </div>
        )}
      </div>
    </div>
  )
}
