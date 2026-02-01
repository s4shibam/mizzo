import { useEffect, useMemo, useRef } from 'react'

type LiveLyricsDisplayProps = {
  lines: Array<{ startTime: number; endTime: number; text: string }>
  currentTime: number
}

export const LiveLyricsDisplay = ({
  lines,
  currentTime
}: LiveLyricsDisplayProps) => {
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([])

  const activeIndex = useMemo(
    () =>
      lines.findIndex(
        (line) => line.startTime <= currentTime && currentTime < line.endTime
      ),
    [lines, currentTime]
  )

  useEffect(() => {
    if (activeIndex < 0) return
    const activeLine = lineRefs.current[activeIndex]
    if (!activeLine) return

    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeIndex])

  return (
    <div className="mx-auto max-w-4xl space-y-6 text-center text-2xl font-semibold leading-relaxed text-zinc-500 md:text-3xl">
      {lines.map((line, index) => {
        const isActive = index === activeIndex
        return (
          <p
            key={`${line.startTime}-${index}`}
            ref={(el) => {
              lineRefs.current[index] = el
            }}
            className={isActive ? 'text-primary' : 'text-zinc-500'}
          >
            {line.text || '♪♪♪'}
          </p>
        )
      })}
    </div>
  )
}
