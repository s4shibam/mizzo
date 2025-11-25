import { Card, Tag } from 'antd'

import { ChartCard } from '@/components/dashboard/chart-card'
import { VisibilitySplit } from '@/components/dashboard/visibility-split'
import {
  AreaChart,
  type TAreaChartData
} from '@/components/recharts/area-chart'
import { BarChart, type TBarChartData } from '@/components/recharts/bar-chart'
import { PieChart } from '@/components/recharts/pie-chart'
import type { TAdminDashboardSummary } from '@/hooks/api/admin'
import { createStatusPieData } from '@/lib/dashboard'
import { formatNumber } from '@/lib/utils'
import type { TStatus } from '@/types/index'

import { UserCompositionBreakdown } from './user-composition-breakdown'

type AdminOverviewSectionProps = {
  summary?: TAdminDashboardSummary
  timelineSeries: TAreaChartData[]
  engagementSeries: TBarChartData[]
  trackStatuses: { status: TStatus; value: number }[]
  playlistVisibility: { label: string; value: number }[]
}

const AREA_CHART_COLORS = ['#f59e0b', '#7c3aed', '#0ea5e9']

const ENGAGEMENT_CHART_COLORS = ['#f97316', '#8b5cf6']

export const AdminOverviewSection = ({
  summary,
  timelineSeries,
  engagementSeries,
  trackStatuses,
  playlistVisibility
}: AdminOverviewSectionProps) => {
  const statusPieData = createStatusPieData(trackStatuses)

  const statusPieTotal = statusPieData.reduce(
    (sum, slice) => sum + slice.value,
    0
  )

  const userCompositionData = () => {
    const total = summary?.userCount?.total ?? 0
    if (!total) return null

    return {
      artists: summary?.userCount?.artist ?? 0,
      publicProfiles: summary?.userCount?.public ?? 0,
      admins: summary?.userCount?.admin ?? 0,
      premiumListeners: summary?.userCount?.premium ?? 0,
      total
    }
  }

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          subtitle="Users, tracks and playlists added"
          title="Creation Velocity"
        >
          <AreaChart
            colors={AREA_CHART_COLORS}
            data={timelineSeries}
            emptyStateMessage="No activity recorded in this window"
            height={350}
          />
        </ChartCard>

        <ChartCard
          subtitle="Status distribution & visibility"
          title="Track Workflow"
        >
          <div className="flex flex-col gap-6">
            <PieChart
              data={statusPieData}
              formatter={(value) => {
                const percent = statusPieTotal
                  ? Math.round((value / statusPieTotal) * 100)
                  : 0
                return `${formatNumber(value)} tracks · ${percent}%`
              }}
              height={260}
              innerRadius={0.55}
              outerRadius={0.95}
            />
            <div className="flex-1">
              <VisibilitySplit slices={playlistVisibility} />
            </div>
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card
          className="relative h-full overflow-hidden border bg-white"
          size="small"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-zinc-500">Audience</p>
              <h3 className="text-lg font-semibold">User Composition</h3>
            </div>
            <Tag className="rounded-full" color="purple">
              {formatNumber(summary?.userCount?.total ?? 0)} Total
            </Tag>
          </div>

          <UserCompositionBreakdown data={userCompositionData()} />
        </Card>

        <ChartCard
          className="lg:col-span-2"
          subtitle="Likes across tracks & playlists"
          title="Engagement Signals"
        >
          <BarChart
            colors={ENGAGEMENT_CHART_COLORS}
            data={engagementSeries}
            emptyStateMessage="No likes recorded"
            height={280}
          />
        </ChartCard>
      </section>
    </>
  )
}
