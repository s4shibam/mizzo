import type { ReactNode } from 'react'

import { Card } from 'antd'

import { cn } from '@mizzo/utils'

type TChartCardProps = {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export const ChartCard = ({
  title,
  subtitle,
  children,
  className
}: TChartCardProps) => (
  <Card
    className={cn(
      'relative overflow-hidden border bg-white transition-shadow',
      className
    )}
    size="small"
  >
    <div className="mb-6 space-y-1">
      {subtitle && (
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {subtitle}
        </p>
      )}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    {children}
  </Card>
)
