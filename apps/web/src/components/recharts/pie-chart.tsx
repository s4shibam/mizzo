import {
  Cell,
  Pie,
  Legend as RechartsLegend,
  PieChart as RechartsPieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts'

import { cn } from '@mizzo/utils'

import { EmptyState } from '../dashboard/empty-state'
import { Legend, Tooltip, type TTooltipPayload } from './utils'

export type TPieChartData = {
  label: string
  value: number
  color: string
}

export type TPieChartProps = {
  label?: string
  data: TPieChartData[]
  height?: number
  className?: string
  innerRadius?: number
  outerRadius?: number
  emptyStateMessage?: string
  formatter?: (value: number) => string
}

export const PieChart = ({
  label,
  data,
  height = 260,
  innerRadius = 0.55,
  outerRadius = 0.95,
  emptyStateMessage,
  formatter,
  className
}: TPieChartProps) => {
  if (data.length === 0) {
    return <EmptyState description={emptyStateMessage ?? 'No data available'} />
  }

  return (
    <ResponsiveContainer
      className={cn('recharts-wrapper w-full', className)}
      height={height}
      width="100%"
    >
      <RechartsPieChart>
        <Pie
          animationDuration={800}
          cornerRadius={8}
          cx="50%"
          cy="50%"
          data={data}
          innerRadius={`${innerRadius * 100}%`}
          nameKey="label"
          outerRadius={`${outerRadius * 100}%`}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke="white"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <RechartsTooltip
          content={({ active, payload }) => {
            if (!active || !payload || !payload.length) {
              return null
            }

            const tooltipPayload: TTooltipPayload[] = payload.map((entry) => {
              // Pie chart payload structure: entry.payload contains the data
              const pieData = (entry.payload as TPieChartData) || {}
              return {
                label: pieData.label || (entry.name as string) || '',
                value: pieData.value ?? (entry.value as number) ?? 0,
                color: pieData.color || entry.color || ''
              }
            })

            return (
              <Tooltip
                active={active}
                formatter={formatter}
                label={label}
                payload={tooltipPayload}
              />
            )
          }}
        />
        <RechartsLegend
          content={({ payload }) => {
            if (!payload || !payload.length) {
              return null
            }

            const legendPayload = payload.map((entry) => {
              // Pie chart legend payload structure: entry.payload contains the data
              const pieData = (entry.payload as TPieChartData) || {}
              return {
                label: pieData.label || (entry.value as string) || '',
                color: pieData.color || entry.color || ''
              }
            })

            return <Legend payload={legendPayload} />
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
