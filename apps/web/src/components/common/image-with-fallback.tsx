import { useState } from 'react'

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
  const [imgSrc, setImgSrc] = useState(src)
  const [showFallbackIcon, setShowFallbackIcon] = useState(false)

  const handleError = (error: Error) => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc)
    } else {
      setShowFallbackIcon(true)
    }
    onError?.(error)
  }

  if (showFallbackIcon) {
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
      src={imgSrc || ''}
      onError={(event) => {
        const error = event as unknown as Error
        handleError(error)
      }}
    />
  )
}
