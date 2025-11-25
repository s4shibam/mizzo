import { Card } from 'antd'

import { cn } from '@mizzo/utils'

import { formatNumber } from '@/lib/utils'
import type { TTrendDirection } from '@/types/index'

export type TMetricCardChange = {
  percentage: number
  trend: TTrendDirection
  referenceWindowInDays: number
}

export type TMetricCardProps = {
  metric: {
    label: string
    value: number
    change?: TMetricCardChange
    className?: string
  }
  icon: JSX.Element
}

const TREND_COLOR_MAP = {
  up: 'text-emerald-600',
  down: 'text-rose-600',
  flat: 'text-zinc-500'
}

export const MetricCard = ({ metric, icon }: TMetricCardProps) => {
  const prefix = metric.change?.trend === 'up' ? '+' : ''
  const deltaColor = TREND_COLOR_MAP[metric.change?.trend ?? 'flat']

  return (
    <Card
      className={cn(
        'relative h-full overflow-hidden border bg-white p-1',
        metric.className
      )}
      size="small"
    >
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary rounded-lg p-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
          <p className="text-2xl font-bold">{formatNumber(metric.value)}</p>
        </div>
      </div>
      {metric.change ? (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className={`font-semibold ${deltaColor}`}>
            {prefix}
            {metric.change.percentage.toFixed(1)}%
          </span>
          <span className="text-xs text-zinc-500">
            vs Prev {metric.change.referenceWindowInDays} Days
          </span>
        </div>
      ) : null}
    </Card>
  )
}
