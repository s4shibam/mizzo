import { useEffect, useState } from 'react'

/**
 * A hook that returns true if the media query matches
 * @param query The media query to match
 * @returns Whether the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Initialize with the current match state
  const getMatches = (): boolean => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  }

  const [matches, setMatches] = useState<boolean>(getMatches)

  useEffect(() => {
    // Handle the initial check
    const updateMatches = () => {
      setMatches(getMatches())
    }

    // Create a media query list
    const mediaQueryList = window.matchMedia(query)

    // Initial check
    updateMatches()

    // Add the listener
    // Using the deprecated addListener for wider browser support
    // Modern browsers use addEventListener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateMatches)
    } else {
      console.error('useMediaQuery: addListener is not supported')
    }

    // Clean up
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', updateMatches)
      } else {
        console.error('useMediaQuery: removeListener is not supported')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return matches
}
