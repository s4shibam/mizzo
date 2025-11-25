import { EmptyState } from '@/components/dashboard/empty-state'
import { PieChart, type TPieChartData } from '@/components/recharts/pie-chart'
import { formatNumber } from '@/lib/utils'

export type TUserCompositionBreakdownProps = {
  data?: {
    artists: number
    publicProfiles: number
    admins: number
    premiumListeners: number
    total: number
  } | null
}

export const UserCompositionBreakdown = ({
  data
}: TUserCompositionBreakdownProps) => {
  if (!data) {
    return <EmptyState description="No user data available" />
  }

  const { artists, publicProfiles, admins, premiumListeners, total } = data

  const compositionItems = [
    {
      label: 'Artists',
      nonLabel: 'Non-Artists',
      value: artists,
      nonValue: total - artists,
      color: '#2563eb',
      nonColor: '#bfdbfe'
    },
    {
      label: 'Public',
      nonLabel: 'Private',
      value: publicProfiles,
      nonValue: total - publicProfiles,
      color: '#7c3aed',
      nonColor: '#ddd6fe'
    },
    {
      label: 'Admins',
      nonLabel: 'Non-Admins',
      value: admins,
      nonValue: total - admins,
      color: '#f97316',
      nonColor: '#fed7aa'
    },
    {
      label: 'Premium',
      nonLabel: 'Regular',
      value: premiumListeners,
      nonValue: total - premiumListeners,
      color: '#f59e0b',
      nonColor: '#fef3c7'
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {compositionItems.map((item) => {
        const pieData: TPieChartData[] = [
          {
            label: item.label,
            value: item.value,
            color: item.color
          },
          {
            label: item.nonLabel,
            value: item.nonValue,
            color: item.nonColor
          }
        ]

        return (
          <PieChart
            key={item.label}
            data={pieData}
            formatter={(value) => {
              const itemPercent = Math.round((value / total) * 100)
              return `${formatNumber(value)} users · ${itemPercent}%`
            }}
            height={140}
            innerRadius={0.6}
            outerRadius={0.95}
          />
        )
      })}
    </div>
  )
}
