import type { IconType } from 'react-icons'
import {
  FiBarChart2,
  FiLayers,
  FiMusic,
  FiStar,
  FiTrendingUp
} from 'react-icons/fi'

import { MetricCard } from '@/components/dashboard/metric-card'
import type { TArtistDashboardSummary } from '@/hooks/api/artist'

const METRIC_CONFIG_MAP: Record<string, { Icon: IconType; gradient: string }> =
  {
    'Tracks Published': {
      Icon: FiMusic,
      gradient: 'bg-gradient-to-br from-transparent via-transparent to-blue-50'
    },
    'Track Likes': {
      Icon: FiStar,
      gradient:
        'bg-gradient-to-br from-transparent via-transparent to-purple-50'
    },
    'Playlist Adds': {
      Icon: FiBarChart2,
      gradient: 'bg-gradient-to-br from-transparent via-transparent to-pink-50'
    },
    Collaborations: {
      Icon: FiTrendingUp,
      gradient:
        'bg-gradient-to-br from-transparent via-transparent to-indigo-50'
    }
  }

type ArtistMetricsSectionProps = {
  overview?: TArtistDashboardSummary['overview']
}

export const ArtistMetricsSection = ({
  overview
}: ArtistMetricsSectionProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {overview?.map((metric) => {
        const config = METRIC_CONFIG_MAP[metric.label]
        const Icon = config?.Icon ?? FiLayers

        return (
          <MetricCard
            key={metric.label}
            icon={<Icon className="size-5" />}
            metric={{
              ...metric,
              className: config?.gradient
            }}
          />
        )
      })}
    </section>
  )
}
