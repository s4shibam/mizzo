import { useEffect, useState } from 'react'

import type { ImageProps, StaticImageData } from 'next/image'
import NextImage from 'next/image'
import { LuImage } from 'react-icons/lu'

export type ImageWithFallbackProps = Omit<ImageProps, 'onError' | 'src'> & {
  src: string | StaticImageData | undefined
  fallbackSrc?: string | StaticImageData
  onError?: (error: Error) => void
  fallbackIconSize?: number
}

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  onError,
  alt,
  fallbackIconSize = 24,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)
  const [showFallbackIcon, setShowFallbackIcon] = useState(false)

  // Sync imgSrc when src changes
  useEffect(() => {
    if (src) {
      setImgSrc(src)
      setShowFallbackIcon(false)
    } else if (fallbackSrc) {
      setImgSrc(fallbackSrc)
      setShowFallbackIcon(false)
    } else {
      setShowFallbackIcon(true)
    }
  }, [src, fallbackSrc])

  const handleError = (error: Error) => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc)
      setShowFallbackIcon(false)
    } else {
      setShowFallbackIcon(true)
    }
    onError?.(error)
  }

  if (showFallbackIcon || !imgSrc) {
    return (
      <div className="flex size-full items-center justify-center">
        <LuImage size={fallbackIconSize} />
      </div>
    )
  }

  return (
    <NextImage
      {...props}
      alt={alt}
      src={imgSrc}
      onError={(event) => {
        const error = event as unknown as Error
        handleError(error)
      }}
    />
  )
}
