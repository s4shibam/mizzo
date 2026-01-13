import { useCallback, useEffect, useRef } from 'react'

import { createRoot } from 'react-dom/client'
import { toast } from 'react-hot-toast'

import type { Track } from '@/types/track'

import { PipPlayerContent } from './pip-player-content'

type PipPlayerProps = {
  track: Track
  isPlaying: boolean
  currentTime: number
  duration: number
  isLiked: boolean
  playNext: () => void
  playPrevious: () => void
  togglePlayPause: (play: boolean) => void
  toggleLike: () => void
  handleSeek: (newTime: number) => void
  onClose: () => void
}

export const PipPlayer = ({
  track,
  isPlaying,
  currentTime,
  duration,
  isLiked,
  playNext,
  playPrevious,
  togglePlayPause,
  toggleLike,
  handleSeek,
  onClose
}: PipPlayerProps) => {
  const pipWindowRef = useRef<Window | null>(null)
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null)
  const isOpeningRef = useRef(false)
  const callbacksRef = useRef({
    playNext,
    playPrevious,
    togglePlayPause,
    toggleLike,
    handleSeek,
    onClose
  })

  useEffect(() => {
    callbacksRef.current = {
      playNext,
      playPrevious,
      togglePlayPause,
      toggleLike,
      handleSeek,
      onClose
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Copy Tailwind styles to PiP window
  const copyStylesToPipWindow = useCallback((pipWindow: Window) => {
    // Get all stylesheets from the main document
    const stylesheets = Array.from(document.styleSheets)

    stylesheets.forEach((stylesheet) => {
      try {
        // Try to access the stylesheet
        if (stylesheet.href) {
          // External stylesheet - create a link element
          const link = pipWindow.document.createElement('link')
          link.rel = 'stylesheet'
          link.href = stylesheet.href
          pipWindow.document.head.appendChild(link)
        } else if (stylesheet.cssRules) {
          // Inline stylesheet - copy the rules
          const style = pipWindow.document.createElement('style')
          Array.from(stylesheet.cssRules).forEach((rule) => {
            style.appendChild(pipWindow.document.createTextNode(rule.cssText))
          })
          pipWindow.document.head.appendChild(style)
        }
      } catch (e) {
        console.warn('Could not copy stylesheet:', e)
      }
    })
  }, [])

  // Render React component in PiP window
  const renderPipContent = useCallback(() => {
    if (!pipWindowRef.current || !rootRef.current) return

    const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * duration
      callbacksRef.current.handleSeek(newTime)
    }

    rootRef.current.render(
      <PipPlayerContent
        currentTime={currentTime}
        duration={duration}
        isLiked={isLiked}
        isPlaying={isPlaying}
        track={track}
        onLike={() => callbacksRef.current.toggleLike()}
        onNext={() => callbacksRef.current.playNext()}
        onPlayPause={() => callbacksRef.current.togglePlayPause(!isPlaying)}
        onPrevious={() => callbacksRef.current.playPrevious()}
        onSeek={handleSeekClick}
      />
    )
  }, [track, isPlaying, currentTime, duration, isLiked])

  // Open PiP window once on mount
  useEffect(() => {
    // Prevent opening multiple windows
    if (isOpeningRef.current || pipWindowRef.current) return

    const openPipWindow = async () => {
      isOpeningRef.current = true

      // Check if Document Picture-in-Picture API is supported
      if (!('documentPictureInPicture' in window)) {
        toast.error('Picture-in-Picture is not supported in your browser.')
        callbacksRef.current.onClose()
        isOpeningRef.current = false
        return
      }

      try {
        // @ts-expect-error - documentPictureInPicture is experimental API, types are not yet available
        const pipWindow = await window.documentPictureInPicture.requestWindow({
          width: 360,
          height: 360
        })

        pipWindowRef.current = pipWindow

        pipWindow.document.body.style.margin = '0'
        pipWindow.document.body.style.padding = '0'
        pipWindow.document.body.style.overflow = 'hidden'

        copyStylesToPipWindow(pipWindow)

        const container = pipWindow.document.createElement('div')
        container.id = 'pip-root'
        container.style.width = '100%'
        container.style.height = '100%'
        pipWindow.document.body.appendChild(container)

        rootRef.current = createRoot(container)

        renderPipContent()

        pipWindow.addEventListener('pagehide', () => {
          if (rootRef.current) {
            rootRef.current.unmount()
            rootRef.current = null
          }
          pipWindowRef.current = null
          isOpeningRef.current = false
          callbacksRef.current.onClose()
        })

        isOpeningRef.current = false
      } catch (error) {
        console.error('Failed to open PIP window:', error)
        isOpeningRef.current = false
        callbacksRef.current.onClose()
      }
    }

    openPipWindow()

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount()
        rootRef.current = null
      }
      if (pipWindowRef.current && !pipWindowRef.current.closed) {
        pipWindowRef.current.close()
        pipWindowRef.current = null
      }
      isOpeningRef.current = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      pipWindowRef.current &&
      !pipWindowRef.current.closed &&
      rootRef.current
    ) {
      renderPipContent()
    }
  }, [renderPipContent])

  return null
}
