import React from 'react'

import Link from 'next/link'
import type { IconType } from 'react-icons/lib'

import { cn } from '@mizzo/utils'

type IconItemProps = {
  item: {
    link?: string
    label: string | React.ReactNode
    Icon: IconType
    onClick?: () => void
  }
  isActive: boolean
  className?: string
  onClick?: () => void
}

export const IconItem = ({
  item,
  isActive,
  className,
  onClick
}: IconItemProps) => {
  const sharedClasses = cn(
    'flex items-center gap-2 rounded-lg border border-transparent text-inherit px-3 py-2 transition-colors duration-300 hover:bg-background/60',
    {
      'border-inherit bg-background': isActive
    },
    className
  )

  const iconClasses = cn('size-5', {
    'text-primary': isActive
  })

  if (item?.link) {
    return (
      <Link className={sharedClasses} href={item.link} onClick={onClick}>
        <item.Icon className={iconClasses} />

        <p className="text-base">{item.label}</p>
      </Link>
    )
  }

  return (
    <button
      className={sharedClasses}
      onClick={() => {
        item.onClick?.()
        onClick?.()
      }}
    >
      <item.Icon className={iconClasses} />

      <p className="text-base">{item.label}</p>
    </button>
  )
}
