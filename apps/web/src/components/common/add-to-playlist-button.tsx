import type { ReactNode } from 'react'

import { AddToPlaylistModal } from '@/components/modals/add-to-playlist'
import { useOpenClose } from '@/hooks/custom/use-open-close'

type AddToPlaylistButtonProps = {
  children: ReactNode
  className?: string
  trackId: string
  trackTitle: string
}

export const AddToPlaylistButton = ({
  children,
  className,
  trackId,
  trackTitle
}: AddToPlaylistButtonProps) => {
  const { isOpen, open, close } = useOpenClose()

  return (
    <>
      <AddToPlaylistModal
        close={close}
        isOpen={isOpen}
        trackId={trackId}
        trackTitle={trackTitle}
      />
      <button className={className} onClick={open}>
        {children}
      </button>
    </>
  )
}
