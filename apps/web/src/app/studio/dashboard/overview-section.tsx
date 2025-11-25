import { Card, Tag } from 'antd'
import { FiEye, FiEyeOff, FiHeadphones, FiHeart, FiUsers } from 'react-icons/fi'
import { LuListMusic } from 'react-icons/lu'

import { ChartCard } from '@/components/dashboard/chart-card'
import { VisibilitySplit } from '@/components/dashboard/visibility-split'
import {
  AreaChart,
  type TAreaChartData
} from '@/components/recharts/area-chart'
import { BarChart, type TBarChartData } from '@/components/recharts/bar-chart'
import { PieChart } from '@/components/recharts/pie-chart'
import type { TArtistDashboardSummary } from '@/hooks/api/artist'
import { createStatusPieData } from '@/lib/dashboard'
import { formatNumber } from '@/lib/utils'
import type { TStatus } from '@/types/index'

import { EngagementStat } from './engagement-stat'

type ArtistOverviewSectionProps = {
  summary?: TArtistDashboardSummary
  timelineSeries: TAreaChartData[]
  engagementSeries: TBarChartData[]
  trackStatuses: { status: TStatus; value: number }[]
  trackVisibility: { label: string; value: number }[]
}

const AREA_CHART_COLORS = ['#A16207']
const ENGAGEMENT_CHART_COLORS = ['#2563EB', '#F97316']

export const ArtistOverviewSection = ({
  summary,
  timelineSeries,
  engagementSeries,
  trackStatuses,
  trackVisibility
}: ArtistOverviewSectionProps) => {
  const statusPieData = createStatusPieData(trackStatuses)

  const statusPieTotal = statusPieData.reduce(
    (sum, slice) => sum + slice.value,
    0
  )

  const engagementStats = summary?.engagement
  const catalogStats = summary?.catalogStats
  const playlistPresence = summary?.playlistPresence

  const catalogGroups = [
    {
      title: 'Visibility',
      items: [
        {
          icon: FiEye,
          label: 'Public',
          value: catalogStats?.public ?? 0,
          className: 'bg-emerald-500/10 text-emerald-600'
        },
        {
          icon: FiEyeOff,
          label: 'Private',
          value: catalogStats?.private ?? 0,
          className: 'bg-amber-500/10 text-amber-600'
        }
      ]
    },
    {
      title: 'Playlists',
      items: [
        {
          icon: LuListMusic,
          label: 'Owned',
          value: playlistPresence?.owned ?? 0,
          className: 'bg-cyan-500/10 text-cyan-600'
        },
        {
          icon: FiHeart,
          label: 'Liked',
          value: playlistPresence?.likes ?? 0,
          className: 'bg-pink-500/10 text-pink-600'
        }
      ]
    },
    {
      title: 'Engagement',
      items: [
        {
          icon: FiUsers,
          label: 'Collaborations',
          value: catalogStats?.collaborations ?? 0,
          className: 'bg-indigo-500/10 text-indigo-600'
        },
        {
          icon: FiHeadphones,
          label: 'Lifetime listens',
          value: catalogStats?.listens ?? 0,
          className: 'bg-blue-500/10 text-blue-600'
        }
      ]
    }
  ]

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          subtitle="Tracks published over time"
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
              <VisibilitySplit slices={trackVisibility} />
            </div>
          </div>
        </ChartCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="relative overflow-hidden border bg-white" size="small">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-zinc-500">Catalog</p>
              <h3 className="text-lg font-semibold">Catalog snapshot</h3>
            </div>
            <Tag className="rounded-full" color="purple">
              {formatNumber(catalogStats?.total ?? 0)} Tracks
            </Tag>
          </div>
          <div className="space-y-4">
            {catalogGroups.map((group, groupIndex) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
                  {group.title}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.label}
                        className="rounded-lg border bg-white p-3"
                      >
                        <div className="flex items-center gap-2">
                          <div className={item.className + ' rounded-md p-2'}>
                            <Icon className="size-4" />
                          </div>
                          <p className="text-xs font-medium text-zinc-600">
                            {item.label}
                          </p>
                        </div>
                        <p className="mt-2 text-lg font-semibold">
                          {formatNumber(item.value)}
                        </p>
                      </div>
                    )
                  })}
                </div>
                {groupIndex < catalogGroups.length - 1 && (
                  <div className="mt-4 border-t" />
                )}
              </div>
            ))}
          </div>
        </Card>

        <ChartCard
          className="lg:col-span-2"
          subtitle="Likes and playlist placements over time"
          title="Engagement Signals"
        >
          <BarChart
            colors={ENGAGEMENT_CHART_COLORS}
            data={engagementSeries}
            emptyStateMessage="No engagement recorded"
            height={300}
          />
          {engagementStats ? (
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <EngagementStat
                current={engagementStats.trackLikes.current}
                label="Track likes"
                previous={engagementStats.trackLikes.previous}
                total={engagementStats.trackLikes.total}
              />
              <EngagementStat
                current={engagementStats.playlistAdds.current}
                label="Playlist adds"
                previous={engagementStats.playlistAdds.previous}
                total={engagementStats.playlistAdds.total}
              />
            </div>
          ) : null}
        </ChartCard>
      </section>
    </>
  )
}
