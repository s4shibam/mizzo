'use client'

import { Segmented } from 'antd'
import type { SegmentedValue } from 'antd/es/segmented'

import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { DASHBOARD_RANGE_VALUES } from '@/constants/dashboard'
import { useGetArtistDashboardSummary } from '@/hooks/api/artist'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { createRangeOptions, createTimelineSeries } from '@/lib/dashboard'
import { getFormattedDate } from '@/lib/dayjs'

import { ArtistHighlightsSection } from './highlights-section'
import { ArtistMetricsSection } from './metrics-section'
import { ArtistOverviewSection } from './overview-section'

const RANGE_OPTIONS = createRangeOptions(DASHBOARD_RANGE_VALUES)

const StudioDashboardPage = () => {
  const { qParams, updateQParam } = useQueryParams()
  const rangeParam = qParams.range
  const rangeNumber = rangeParam ? Number(rangeParam) : NaN
  const range = !isNaN(rangeNumber) && rangeNumber > 0 ? rangeNumber : 30

  const {
    data: dashboard,
    isLoading,
    error
  } = useGetArtistDashboardSummary({ lastNDays: range })

  const dashboardData = dashboard?.data
  const timelinePoints = dashboardData?.timeline?.points ?? []
  const trackStatuses = dashboardData?.releasePipeline?.statuses ?? []
  const trackVisibility = dashboardData?.releasePipeline?.visibility ?? []

  const timelineSeries = createTimelineSeries(timelinePoints, [
    { key: 'tracks', category: 'Tracks Published' }
  ])

  const engagementSeries = createTimelineSeries(timelinePoints, [
    { key: 'trackLikes', category: 'Track Likes' },
    { key: 'playlistAdds', category: 'Playlist Adds' }
  ])

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
            Studio Dashboard
          </p>
          <h1 className="text-3xl font-bold">Performance Overview</h1>
          <p className="text-sm text-zinc-500">
            Last refreshed:{' '}
            {getFormattedDate(
              dashboardData?.generatedAt,
              'DD MMM, YYYY, hh:mm:ss A'
            )}
          </p>
        </div>

        <Segmented
          className="[&_.ant-segmented-item-selected]:shadow-none"
          options={RANGE_OPTIONS}
          value={range}
          onChange={handleRangeChange}
        />
      </div>

      <ArtistMetricsSection overview={dashboardData?.overview} />

      <ArtistOverviewSection
        engagementSeries={engagementSeries}
        summary={dashboardData}
        timelineSeries={timelineSeries}
        trackStatuses={trackStatuses}
        trackVisibility={trackVisibility}
      />

      <ArtistHighlightsSection
        reviewQueue={dashboardData?.reviewQueue}
        topEntities={dashboardData?.topEntities}
        totalTrackListens={dashboardData?.catalogStats?.listens ?? 0}
      />
    </div>
  )
}

export default StudioDashboardPage
