import type { TBarChartData } from '@/components/recharts/bar-chart'
import type { TPieChartData } from '@/components/recharts/pie-chart'
import type { TStatus } from '@/types/index'

import { getFormattedDate } from './dayjs'
import { getStatusInfo } from './utils'

export const createRangeOptions = (
  values: readonly number[]
): { label: string; value: number }[] => {
  return values.map((value) => ({
    label: `${value}d`,
    value
  }))
}

export type TimelinePoint = {
  date: string
  [key: string]: string | number
}

export const createTimelineSeries = (
  points: TimelinePoint[],
  mappings: Array<{ key: string; category: string }>
): TBarChartData[] => {
  if (!points.length) {
    return []
  }

  return points.flatMap((point) =>
    mappings.map((mapping) => ({
      label: getFormattedDate(point.date, 'DD/MMM/YY'),
      category: mapping.category,
      value: (point[mapping.key] as number) ?? 0
    }))
  )
}

export const createStatusPieData = (
  statuses: Array<{ status: TStatus; value: number }>
): TPieChartData[] => {
  return statuses
    .filter((item) => item.value > 0)
    .map((item) => ({
      label: item.status,
      value: item.value,
      color: getStatusInfo(item.status).color
    }))
}
