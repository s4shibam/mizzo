import { useEffect } from 'react'

type UseMediaKeysProps = {
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  isPlaying: boolean
  trackTitle?: string
  trackArtist?: string
  trackArtwork?: string
}

/**
 * Hook to handle keyboard media keys (F7, F8, F9) and MediaSession API
 * F7: Previous track
 * F8: Play/Pause (native browser support)
 * F9: Next track
 */
export const useMediaKeys = ({
  onPlayPause,
  onNext,
  onPrevious,
  isPlaying,
  trackTitle,
  trackArtist,
  trackArtwork
}: UseMediaKeysProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F7' || e.key === 'F8' || e.key === 'F9') {
        e.preventDefault()
      }

      if (e.key === 'F7') {
        onPrevious()
      } else if (e.key === 'F8') {
        onPlayPause()
      } else if (e.key === 'F9') {
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: trackTitle || 'Unknown Track',
        artist: trackArtist || 'Unknown Artist',
        artwork: trackArtwork
          ? [
              {
                src: trackArtwork,
                sizes: '512x512',
                type: 'image/jpeg'
              }
            ]
          : []
      })

      navigator.mediaSession.setActionHandler('play', onPlayPause)
      navigator.mediaSession.setActionHandler('pause', onPlayPause)
      navigator.mediaSession.setActionHandler('previoustrack', onPrevious)
      navigator.mediaSession.setActionHandler('nexttrack', onNext)
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'
    }

    return () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null)
        navigator.mediaSession.setActionHandler('pause', null)
        navigator.mediaSession.setActionHandler('previoustrack', null)
        navigator.mediaSession.setActionHandler('nexttrack', null)
      }
    }
  }, [
    onPlayPause,
    onNext,
    onPrevious,
    isPlaying,
    trackTitle,
    trackArtist,
    trackArtwork
  ])
}
