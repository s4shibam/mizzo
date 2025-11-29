import { useEffect, useRef, useState } from 'react'

import Hls from 'hls.js'
import { useCookies } from 'react-cookie'

import { s3GetUrlFromKey } from '@/lib/utils'
import { usePlayerContext } from '@/providers/player-provider'

export const useHlsPlayer = () => {
  const {
    activeTrack,
    setActiveTrack,
    activePlaylist,
    setActivePlaylist,
    isActiveTrackPlaying,
    setIsActiveTrackPlaying
  } = usePlayerContext()

  const [cookies, setCookies] = useCookies(['volume'])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [volume, setVolume] = useState(parseFloat(cookies?.volume || '0.5'))
  const [isMuted, setIsMuted] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false)

  const trackRef = useRef<HTMLAudioElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)

  useEffect(() => {
    if (!activeTrack?.id || !trackRef.current) return

    setIsLoading(true)
    setIsActiveTrackPlaying(true)

    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }

    const streamUrl =
      s3GetUrlFromKey(`transcoded-track/${activeTrack.id}/master.m3u8`) || ''

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        autoStartLoad: true,
        startLevel: -1, // Auto-select best quality level based on bandwidth
        // Buffer management - incremental loading (key settings to prevent loading all segments)
        maxBufferLength: 10, // Maximum buffer length in seconds (reduced from 30 to prevent aggressive buffering)
        maxMaxBufferLength: 20, // Hard limit on buffer length (prevents excessive buffering)
        maxBufferSize: 30 * 1000 * 1000, // 30MB max buffer size in bytes (reduced from default 60MB)
        maxBufferHole: 0.5, // Max gap in buffer before seeking
        // Adaptive Bitrate Streaming (ABR) settings for quality adaptation
        abrBandWidthFactor: 0.95, // Conservative bandwidth factor (stay on current level)
        abrBandWidthUpFactor: 0.7, // Less aggressive up-switching (prevents rapid quality changes)
        abrEwmaDefaultEstimate: 500000, // Default bandwidth estimate (500kbps)
        abrEwmaFastVoD: 3, // Fast VoD bandwidth estimation (3 seconds)
        abrEwmaSlowVoD: 9, // Slow VoD bandwidth estimation (9 seconds)
        // Segment loading timeouts
        fragLoadingTimeOut: 4000, // Max time to wait for fragment load (4 seconds)
        fragLoadingMaxRetry: 3, // Max retries for failed fragment loads
        // Prevent loading all segments at once
        maxStarvationDelay: 4 // Max buffering delay before switching quality down
      })

      hlsRef.current = hls

      const trackElement = trackRef.current
      hls.attachMedia(trackElement)

      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(streamUrl)
      })

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false)
        trackElement.play().catch(() => {
          setIsActiveTrackPlaying(false)
        })
      })

      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error('HLS error:', data)
        if (data.fatal) {
          setIsActiveTrackPlaying(false)
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError()
              break
            default:
              hls.destroy()
              hlsRef.current = null
              break
          }
        }
      })

      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    } else if (trackRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      const trackElement = trackRef.current
      trackElement.src = streamUrl
      setIsLoading(false)

      trackElement.play().catch(() => {
        setIsActiveTrackPlaying(false)
      })

      return () => {
        if (trackElement) {
          trackElement.src = ''
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack?.id])

  useEffect(() => {
    if (!trackRef.current) return

    if (isActiveTrackPlaying) {
      trackRef.current.play().catch(() => {
        setIsActiveTrackPlaying(false)
      })
    } else {
      trackRef.current.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActiveTrackPlaying])

  const playRandom = () => {
    if (
      !activePlaylist?.playlistTracks ||
      activePlaylist.playlistTracks.length === 0
    ) {
      return
    }

    const playlistSize = activePlaylist.playlistTracks.length
    if (playlistSize === 1) {
      return
    }

    let randomIndex
    const currentTrackId = activeTrack?.id
    do {
      randomIndex = Math.floor(Math.random() * playlistSize)
    } while (
      activePlaylist.playlistTracks[randomIndex].id === currentTrackId &&
      playlistSize > 1
    )

    setActiveTrack(activePlaylist.playlistTracks[randomIndex])
  }

  const playNext = () => {
    if (isShuffleEnabled) {
      playRandom()
      return
    }

    let nextTrackIndex = 0
    const playlistSize = activePlaylist?.playlistTracks?.length

    if (!playlistSize) {
      return
    }

    const currentIndex =
      activePlaylist?.playlistTracks?.findIndex(
        ({ id }) => id === activeTrack?.id
      ) || 0

    if (currentIndex === playlistSize - 1) {
      nextTrackIndex = 0
    } else {
      nextTrackIndex = currentIndex + 1
    }

    if (activePlaylist?.playlistTracks) {
      setActiveTrack(activePlaylist?.playlistTracks?.[nextTrackIndex])
    }
  }

  const playPrevious = () => {
    if (isShuffleEnabled) {
      playRandom()
      return
    }

    let previousTrackIndex = 0
    const playlistSize = activePlaylist?.playlistTracks?.length

    if (!playlistSize) {
      return
    }

    const currentIndex =
      activePlaylist?.playlistTracks?.findIndex(
        ({ id }) => id === activeTrack?.id
      ) || 0

    if (currentIndex === 0) {
      previousTrackIndex = playlistSize - 1
    } else {
      previousTrackIndex = currentIndex - 1
    }

    if (activePlaylist?.playlistTracks) {
      setActiveTrack(activePlaylist?.playlistTracks?.[previousTrackIndex])
    }
  }

  const togglePlayPause = (isPlaying: boolean) => {
    if (!trackRef.current) return

    if (isPlaying) {
      trackRef.current.play().catch(() => {
        // Handle potential play errors (e.g., user interaction needed)
        setIsActiveTrackPlaying(false)
      })
    } else {
      trackRef.current.pause()
    }
    setIsActiveTrackPlaying(isPlaying)
  }

  const stop = () => {
    setActiveTrack(undefined)
    setActivePlaylist(undefined)
    setIsActiveTrackPlaying(false)

    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }
  }

  const handleTimeUpdate = () => {
    if (!trackRef.current) return

    setCurrentTime(trackRef.current.currentTime)
    setDuration(trackRef.current.duration || 0)

    if (trackRef.current.buffered.length > 0) {
      const bufferedEnd = trackRef.current.buffered.end(
        trackRef.current.buffered.length - 1
      )
      const bufferedPercent = (bufferedEnd / trackRef.current.duration) * 100
      setBuffered(bufferedPercent)
    }
  }

  const handleSeek = (time: number) => {
    if (!trackRef.current) return

    trackRef.current.currentTime = time
    setCurrentTime(time)
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    setCookies('volume', newVolume.toString(), { path: '/' })

    if (trackRef.current) {
      trackRef.current.volume = isMuted ? 0 : newVolume
    }
  }

  const toggleMute = () => {
    const isNowMuted = !isMuted
    setIsMuted(isNowMuted)
    setVolume(isNowMuted ? 0 : 0.5)

    if (trackRef.current) {
      trackRef.current.volume = isNowMuted ? 0 : 0.5
    }
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping)

    if (trackRef.current) {
      trackRef.current.loop = !isLooping
    }
  }

  const toggleShuffle = () => {
    setIsShuffleEnabled((prev) => !prev)
  }

  return {
    trackRef,
    currentTime,
    duration,
    buffered,
    isLoading,
    volume,
    isMuted,
    isLooping,
    isShuffleEnabled,
    playNext,
    playPrevious,
    togglePlayPause,
    stop,
    handleTimeUpdate,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    toggleLoop,
    toggleShuffle
  }
}
