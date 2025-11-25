'use client'

import { Segmented } from 'antd'
import type { SegmentedValue } from 'antd/es/segmented'

import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { DASHBOARD_RANGE_VALUES } from '@/constants/dashboard'
import { useGetAdminDashboardSummary } from '@/hooks/api/admin'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { createRangeOptions, createTimelineSeries } from '@/lib/dashboard'
import { getFormattedDate } from '@/lib/dayjs'

import { AdminHighlightsSection } from './highlights-section'
import { AdminMetricsSection } from './metrics-section'
import { AdminOverviewSection } from './overview-section'

const RANGE_OPTIONS = createRangeOptions(DASHBOARD_RANGE_VALUES)

const AdminDashboardPage = () => {
  const { qParams, updateQParam } = useQueryParams()
  const rangeParam = qParams.range
  const rangeNumber = rangeParam ? Number(rangeParam) : NaN
  const range = !isNaN(rangeNumber) && rangeNumber > 0 ? rangeNumber : 30

  const {
    data: dashboard,
    isLoading,
    error
  } = useGetAdminDashboardSummary({ lastNDays: range })

  const summary = dashboard?.data
  const timelinePoints = summary?.timeline?.points ?? []

  const timelineSeries = createTimelineSeries(timelinePoints, [
    { key: 'users', category: 'Users' },
    { key: 'tracks', category: 'Tracks' },
    { key: 'playlists', category: 'Playlists' }
  ])

  const engagementSeries = createTimelineSeries(timelinePoints, [
    { key: 'trackLikes', category: 'Track Likes' },
    { key: 'playlistLikes', category: 'Playlist Likes' }
  ])

  const trackStatuses = summary?.trackPipeline?.statuses ?? []
  const playlistVisibility = summary?.playlistInsights?.visibility ?? []

  if (isLoading) {
    return <Loader loading />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  const handleRangeChange = (value: SegmentedValue) => {
    updateQParam('range', String(value), 'replace')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-primary text-xs font-semibold uppercase">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-bold">Operational Overview</h1>
          <p className="text-sm text-zinc-500">
            Last refreshed:{' '}
            {getFormattedDate(summary?.generatedAt, 'DD MMM, YYYY, hh:mm:ss A')}
          </p>
        </div>

        <Segmented
          className="[&_.ant-segmented-item-selected]:shadow-none"
          options={RANGE_OPTIONS}
          value={range}
          onChange={handleRangeChange}
        />
      </div>

      <AdminMetricsSection overview={summary?.overview} />

      <AdminOverviewSection
        engagementSeries={engagementSeries}
        playlistVisibility={playlistVisibility}
        summary={summary}
        timelineSeries={timelineSeries}
        trackStatuses={trackStatuses}
      />

      <AdminHighlightsSection
        reviewQueues={summary?.reviewQueues}
        topEntities={summary?.topEntities}
        totalTrackListens={summary?.aggregate?.totalTrackListens ?? 0}
      />
    </div>
  )
}

export default AdminDashboardPage
