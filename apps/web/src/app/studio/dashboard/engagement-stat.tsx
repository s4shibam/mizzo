import { cn } from '@mizzo/utils'

import { formatNumber } from '@/lib/utils'
import type { TTrendDirection } from '@/types/index'

type EngagementStatProps = {
  label: string
  current: number
  previous: number
  total: number
}

export const EngagementStat = ({
  label,
  current,
  previous,
  total
}: EngagementStatProps) => {
  const delta = current - previous
  const trend = delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down'
  const trendColorMap: Record<TTrendDirection, string> = {
    up: 'text-emerald-600',
    down: 'text-rose-600',
    flat: 'text-zinc-500'
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{label}</p>
          <p className="text-xl font-semibold">{formatNumber(current)}</p>
        </div>
        <span className={cn('text-sm font-semibold', trendColorMap[trend])}>
          {delta > 0 ? '+' : ''}
          {formatNumber(delta)}
        </span>
      </div>
      <p className="text-xs text-zinc-500">
        Lifetime total · {formatNumber(total)}
      </p>
    </div>
  )
}
