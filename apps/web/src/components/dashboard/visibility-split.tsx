export type TVisibilitySplitProps = {
  slices: { label: string; value: number }[]
}

export const VisibilitySplit = ({ slices }: TVisibilitySplitProps) => {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)

  if (!total) {
    return (
      <p className="text-sm text-zinc-500">
        No data to display for this window.
      </p>
    )
  }

  const sortedSlices = [...slices].sort((a, b) => {
    if (a.label === 'Public') return -1
    if (b.label === 'Public') return 1
    return 0
  })

  const publicSlice = sortedSlices.find((s) => s.label === 'Public')
  const privateSlice = sortedSlices.find((s) => s.label === 'Private')

  const publicPercent = publicSlice
    ? Math.round((publicSlice.value / total) * 100)
    : 0
  const privatePercent = privateSlice
    ? Math.round((privateSlice.value / total) * 100)
    : 0

  return (
    <div className="mt-2">
      <p className="mb-3 text-xs uppercase text-zinc-500">Visibility Split</p>

      <div className="relative mb-2 h-3 w-full overflow-hidden rounded-full bg-zinc-100">
        {publicPercent > 0 && (
          <div
            className="absolute left-0 top-0 h-full bg-emerald-500 transition-all"
            style={{ width: `${publicPercent}%` }}
          />
        )}
        {privatePercent > 0 && (
          <div
            className="absolute top-0 h-full bg-zinc-400 transition-all"
            style={{
              left: `${publicPercent}%`,
              width: `${privatePercent}%`
            }}
          />
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-medium uppercase text-zinc-700">
            {publicSlice?.label ?? 'Public'}
          </span>
          <span className="text-zinc-500">{publicPercent}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">{privatePercent}%</span>
          <span className="font-medium uppercase text-zinc-700">
            {privateSlice?.label ?? 'Private'}
          </span>
          <div className="h-2 w-2 rounded-full bg-zinc-400" />
        </div>
      </div>
    </div>
  )
}
