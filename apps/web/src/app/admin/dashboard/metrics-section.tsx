import type { IconType } from 'react-icons'
import {
  FiActivity,
  FiBarChart2,
  FiLayers,
  FiTrendingUp,
  FiUsers
} from 'react-icons/fi'

import { MetricCard } from '@/components/dashboard/metric-card'
import type { TAdminDashboardSummary } from '@/hooks/api/admin'

const METRIC_CONFIG_MAP: Record<string, { Icon: IconType; gradient: string }> =
  {
    'New Users': {
      Icon: FiUsers,
      gradient:
        'bg-gradient-to-br from-transparent via-transparent to-emerald-50'
    },
    'Active Artists': {
      Icon: FiActivity,
      gradient:
        'bg-gradient-to-br from-transparent via-transparent to-purple-50'
    },
    'Tracks Created': {
      Icon: FiBarChart2,
      gradient: 'bg-gradient-to-br from-transparent via-transparent to-pink-50'
    },
    'Engagement Events': {
      Icon: FiTrendingUp,
      gradient:
        'bg-gradient-to-br from-transparent via-transparent to-indigo-50'
    }
  }

type TAdminMetricsSectionProps = {
  overview?: TAdminDashboardSummary['overview']
}

export const AdminMetricsSection = ({
  overview
}: TAdminMetricsSectionProps) => {
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
