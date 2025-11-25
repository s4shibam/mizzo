export type TTooltipPayload = {
  label: string
  value: number
  color: string
}

export type TTooltipProps = {
  label?: string
  active?: boolean
  payload?: TTooltipPayload[]
  formatter?: (value: number, name: string) => string
}

export const Tooltip = ({
  active,
  payload,
  label,
  formatter
}: TTooltipProps) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-white/90 px-2 py-1 backdrop-blur-sm">
      {!!label && (
        <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-zinc-700">
          {label}
        </p>
      )}
      <div className="space-y-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-1">
            <div
              className="size-3 rounded-full border border-white"
              style={{ backgroundColor: entry.color }}
            />
            <span className="whitespace-nowrap text-xs font-medium text-zinc-600">
              {entry.label}
            </span>
            <span>-</span>
            <span className="whitespace-nowrap text-xs font-bold">
              {formatter ? formatter(entry.value, entry.label) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export type TLegendProps = {
  payload?: { label: string; color: string }[]
}

export const Legend = ({ payload }: TLegendProps) => {
  if (!payload || !payload.length) {
    return null
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="size-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-zinc-600">{entry.label}</span>
        </div>
      ))}
    </div>
  )
}
