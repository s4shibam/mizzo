'use client'

import { Card, Tag } from 'antd'

import { cn } from '@mizzo/utils'

import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { useGetArtistDashboardSummary } from '@/hooks/api/artist'

const StudioDashboardPage = () => {
  const {
    data: dashboard,
    isLoading: isDashboardLoading,
    error: dashboardError
  } = useGetArtistDashboardSummary()

  if (isDashboardLoading) {
    return <Loader loading />
  }

  if (dashboardError) {
    return <ErrorInfo error={dashboardError} />
  }

  return (
    <div id="admin-dashboard-summary">
      <h1 className="text-primary mb-6 text-2xl font-bold">Artist Dashboard</h1>

      <div>
        <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-semibold">
          Statistics Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            borderColor="border-amber-100"
            tagColor="gold"
            tagText="Tracks"
            title="Total Tracks"
            value={dashboard?.data?.totalTracks ?? 'NA'}
          />

          <StatCard
            borderColor="border-pink-100"
            tagColor="magenta"
            tagText="Likes"
            title="Total Likes On Tracks"
            value={dashboard?.data?.totalLikesOnTracks ?? 'NA'}
          />

          <StatCard
            borderColor="border-purple-100"
            tagColor="purple"
            tagText="Playlists"
            title="Total Playlists"
            value={dashboard?.data?.totalPlaylists ?? 'NA'}
          />

          <StatCard
            borderColor="border-orange-100"
            tagColor="volcano"
            tagText="Likes"
            title="Total Likes On Playlists"
            value={dashboard?.data?.totalLikesOnPlaylists ?? 'NA'}
          />

          <StatCard
            borderColor="border-green-100"
            tagColor="green"
            tagText="Playlists"
            title="Playlists Having My Tracks"
            value={dashboard?.data?.totalPlaylistsContainingTracks ?? 'NA'}
          />

          <StatCard
            borderColor="border-blue-100"
            tagColor="blue"
            tagText="Collabs"
            title="Total Collaborations"
            value={dashboard?.data?.totalCollaborations ?? 'NA'}
          />
        </div>
      </div>
    </div>
  )
}

export default StudioDashboardPage

type TStatCardProps = {
  title: string
  value: number | string
  tagText: string
  tagColor: string
  className?: string
  borderColor?: string
}

const StatCard = ({
  title,
  value,
  tagText,
  tagColor,
  className = '',
  borderColor
}: TStatCardProps) => (
  <Card
    className={cn(
      'border-y-0 border-l-4 border-r-0 bg-gradient-to-br from-white to-gray-50 shadow-md transition-shadow duration-300 hover:shadow-lg',
      borderColor,
      className
    )}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-zinc-500">{title}</p>

        <p className="text-primary mt-2 text-3xl font-bold">{value}</p>
      </div>

      <Tag className="rounded-full px-3 capitalize" color={tagColor}>
        {tagText}
      </Tag>
    </div>
  </Card>
)
