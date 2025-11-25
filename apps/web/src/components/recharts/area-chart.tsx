import { useMemo } from 'react'

import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  Legend as RechartsLegend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts'

import { cn } from '@mizzo/utils'

import { EmptyState } from '../dashboard/empty-state'
import { Legend, Tooltip, type TTooltipPayload } from './utils'

export type TAreaChartData = {
  label: string
  category: string
  value: number
}

export type TAreaChartProps = {
  data: TAreaChartData[]
  height?: number
  colors: string[]
  className?: string
  emptyStateMessage?: string
}

export const AreaChart = ({
  data,
  height = 350,
  colors,
  className,
  emptyStateMessage
}: TAreaChartProps) => {
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

  const gradients = useMemo(
    () =>
      categories.map((_, index) => ({
        id: `gradient-${index}`,
        color: colors[index % colors.length]
      })),
    [categories, colors]
  )

  if (chartData.length === 0) {
    return <EmptyState description={emptyStateMessage ?? 'No data available'} />
  }

  return (
    <div className={cn('recharts-wrapper w-full', className)}>
      <ResponsiveContainer height={height} width="100%">
        <RechartsAreaChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            {gradients.map((grad) => (
              <linearGradient
                key={grad.id}
                id={grad.id}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="5%" stopColor={grad.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={grad.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            stroke="#e4e4e7"
            strokeDasharray="3 3"
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="label"
            fontSize={11}
            stroke="#71717a"
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            axisLine={false}
            fontSize={11}
            stroke="#71717a"
            tickLine={false}
            tickMargin={8}
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
            <Area
              key={category}
              animationBegin={index * 150}
              animationDuration={1000}
              dataKey={category}
              fill={`url(#${gradients[index].id})`}
              fillOpacity={0.6}
              isAnimationActive={true}
              stroke={colors[index % colors.length]}
              strokeWidth={2.5}
              type="monotone"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}
