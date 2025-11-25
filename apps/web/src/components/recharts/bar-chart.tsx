import { useMemo } from 'react'

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { cn } from '@mizzo/utils'

import { EmptyState } from '../dashboard/empty-state'
import { Legend, Tooltip, type TTooltipPayload } from './utils'

export type TBarChartData = {
  label: string
  category: string
  value: number
}

export type TBarChartProps = {
  data: TBarChartData[]
  height?: number
  colors: string[]
  className?: string
  emptyStateMessage?: string
}

export const BarChart = ({
  data,
  height = 280,
  colors,
  className,
  emptyStateMessage
}: TBarChartProps) => {
  const categories = useMemo(
    () => Array.from(new Set(data.map((d) => d.category))),
    [data]
  )

  const chartData = useMemo(() => {
    const labelMap = new Map<string, Record<string, number | string>>()
    data.forEach((item) => {
      if (!labelMap.has(item.label)) {
        labelMap.set(item.label, { label: item.label })
      }
      labelMap.get(item.label)![item.category] = item.value
    })
    return Array.from(labelMap.values())
  }, [data])

  if (chartData.length === 0) {
    return <EmptyState description={emptyStateMessage ?? 'No data available'} />
  }

  return (
    <div className={cn('recharts-wrapper w-full', className)}>
      <ResponsiveContainer height={height} width="100%">
        <RechartsBarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid
            stroke="#e4e4e7"
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="label"
            fontSize={12}
            stroke="#71717a"
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            fontSize={12}
            stroke="#71717a"
            tickLine={false}
            width={60}
          />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) {
                return null
              }

              const tooltipPayload: TTooltipPayload[] = payload.map((entry) => {
                const dataKey = (entry.dataKey || entry.name) as string
                const categoryIndex = categories.findIndex(
                  (cat) => cat === dataKey
                )
                const color =
                  entry.color ||
                  colors[categoryIndex >= 0 ? categoryIndex % colors.length : 0]

                return {
                  label: dataKey,
                  value: (entry.value as number) ?? 0,
                  color
                }
              })

              return (
                <Tooltip
                  active={active}
                  label={String(label)}
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
                const label = (entry.dataKey || entry.value) as string
                const categoryIndex = categories.findIndex(
                  (cat) => cat === label
                )
                const color =
                  entry.color ||
                  colors[categoryIndex >= 0 ? categoryIndex % colors.length : 0]

                return {
                  label,
                  color
                }
              })

              return <Legend payload={legendPayload} />
            }}
          />
          {categories.map((category, index) => (
            <Bar
              key={category}
              isAnimationActive
              animationBegin={index * 150}
              animationDuration={1000}
              dataKey={category}
              fill={colors[index % colors.length]}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}
