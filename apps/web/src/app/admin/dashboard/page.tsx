'use client'

import { Card, Tag } from 'antd'

import { cn } from '@mizzo/utils'

import { ErrorInfo } from '@/components/common/error-info'
import { Loader } from '@/components/common/loader'
import { useGetAdminDashboardSummary } from '@/hooks/api/admin'

const AdminDashboardPage = () => {
  const {
    data: dashboard,
    isLoading: isDashboardLoading,
    error: dashboardError
  } = useGetAdminDashboardSummary()

  if (isDashboardLoading) {
    return <Loader loading />
  }

  if (dashboardError) {
    return <ErrorInfo error={dashboardError} />
  }

  const borderColorMap: Record<string, string> = {
    gold: 'border-amber-100',
    magenta: 'border-pink-100',
    purple: 'border-purple-100',
    volcano: 'border-orange-100',
    green: 'border-green-100',
    red: 'border-red-100',
    blue: 'border-blue-100',
    processing: 'border-blue-100',
    error: 'border-red-100',
    cyan: 'border-cyan-100',
    lime: 'border-lime-100',
    orange: 'border-orange-100'
  }

  return (
    <div id="admin-dashboard-summary">
      <h1 className="text-primary mb-6 text-2xl font-bold">Admin Dashboard</h1>

      <div className="mb-10">
        <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-semibold">
          User Statistics
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(dashboard?.data?.userCount || {}).map(
            ([key, value]) => {
              const tagColors: Record<string, string> = {
                total: 'gold',
                artist: 'magenta',
                normal: 'purple',
                admin: 'volcano',
                public: 'green',
                private: 'red'
              }

              const titles: Record<string, string> = {
                total: 'Total Users',
                artist: 'Artists',
                normal: 'Normal Users',
                admin: 'Admins',
                public: 'Public Users',
                private: 'Private Users'
              }

              const tagColor = tagColors[key] || 'default'
              const borderColor = borderColorMap[tagColor]

              return (
                <StatCard
                  key={key}
                  borderColor={borderColor}
                  tagColor={tagColor}
                  tagText={key.charAt(0).toUpperCase() + key.slice(1)}
                  title={titles[key]}
                  value={value as number}
                />
              )
            }
          )}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-semibold">
          Track Statistics
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(dashboard?.data?.trackCount || {}).map(
            ([key, value]) => {
              const tagColors: Record<string, string> = {
                total: 'gold',
                public: 'green',
                private: 'red',
                pending: 'blue',
                processing: 'processing',
                failed: 'error',
                reviewing: 'cyan',
                published: 'lime',
                blocked: 'orange'
              }

              const titles: Record<string, string> = {
                total: 'Total Tracks',
                public: 'Public Tracks',
                private: 'Private Tracks',
                pending: 'Pending Tracks',
                processing: 'Processing Tracks',
                failed: 'Failed Tracks',
                reviewing: 'Reviewing Tracks',
                published: 'Published Tracks',
                blocked: 'Blocked Tracks'
              }

              const tagColor = tagColors[key] || 'default'
              const borderColor = borderColorMap[tagColor]

              return (
                <StatCard
                  key={key}
                  borderColor={borderColor}
                  tagColor={tagColor}
                  tagText={key}
                  title={titles[key]}
                  value={value}
                />
              )
            }
          )}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-semibold">
          Playlist Statistics
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(dashboard?.data?.playlistCount || {}).map(
            ([key, value]) => {
              const tagColors: Record<string, string> = {
                total: 'gold',
                public: 'green',
                private: 'red',
                reviewing: 'cyan',
                published: 'lime',
                blocked: 'orange'
              }

              const titles: Record<string, string> = {
                total: 'Total Playlists',
                public: 'Public Playlists',
                private: 'Private Playlists',
                reviewing: 'Reviewing Playlists',
                published: 'Published Playlists',
                blocked: 'Blocked Playlists'
              }

              const tagColor = tagColors[key] || 'default'
              const borderColor = borderColorMap[tagColor]

              return (
                <StatCard
                  key={key}
                  borderColor={borderColor}
                  tagColor={tagColor}
                  tagText={key.charAt(0).toUpperCase() + key.slice(1)}
                  title={titles[key]}
                  value={value}
                />
              )
            }
          )}
        </div>
      </div>

      <div>
        <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-semibold">
          Activity (Last {dashboard?.data?.lastNDaysCount.n} Days)
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.entries(dashboard?.data?.lastNDaysCount || {})
            .filter(([key]) => key !== 'n')
            .map(([key, value]) => {
              const titles = {
                users: 'New Users',
                tracks: 'New Tracks',
                playlists: 'New Playlists',
                trackLikes: 'Track Likes',
                playlistLikes: 'Playlist Likes'
              }

              return (
                <ActivityCard
                  key={key}
                  days={dashboard?.data?.lastNDaysCount.n || 'NA'}
                  title={titles[key as keyof typeof titles]}
                  value={value}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage

type TStatCardProps = {
  title: string
  value: number
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

type TActivityCardProps = {
  title: string
  value: number
  days: number | string
  tagColor?: string
}

const ActivityCard = ({
  title,
  value,
  days,
  tagColor = 'gold'
}: TActivityCardProps) => (
  <Card className="bg-gradient-to-br from-white to-gray-50 shadow-md transition-shadow duration-300 hover:shadow-lg">
    <div className="flex flex-col items-center">
      <Tag className="mb-2 rounded-full px-3" color={tagColor}>
        {days} Days
      </Tag>
      <p className="text-center text-sm font-medium text-zinc-500">{title}</p>
      <p className="text-primary mt-2 text-3xl font-bold">{value}</p>
    </div>
  </Card>
)
