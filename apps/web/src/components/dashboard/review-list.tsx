import { Tag } from 'antd'
import type { StaticImageData } from 'next/image'

import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { getFormattedDate } from '@/lib/dayjs'
import { getStatusInfo } from '@/lib/utils'
import type { TStatus } from '@/types/index'

import { EmptyState } from './empty-state'

export type TReviewListItem = {
  id: string
  title: string
  meta?: string
  status: TStatus
  date: string
  imageUrl?: string | null
  fallbackImage?: string | StaticImageData
}

export type TReviewListProps = {
  items?: TReviewListItem[]
  emptyMessage?: string
}

export const ReviewList = ({ items, emptyMessage }: TReviewListProps) => {
  if (!items || !items.length) {
    return <EmptyState description={emptyMessage ?? 'No items'} />
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <ImageWithFallback
              alt={item.title}
              className="size-10 shrink-0 rounded-full object-cover"
              draggable={false}
              fallbackSrc={item.fallbackImage}
              height={40}
              src={item.imageUrl || undefined}
              width={40}
            />

            <div className="min-w-0 flex-1 space-y-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-zinc-500">
                {item.meta ? `${item.meta} • ` : ''}
                {getFormattedDate(new Date(item.date))}
              </p>
            </div>
          </div>

          <Tag
            className="rounded-full capitalize"
            color={getStatusInfo(item.status).color}
          >
            {item.status.toLowerCase()}
          </Tag>
        </li>
      ))}
    </ul>
  )
}
