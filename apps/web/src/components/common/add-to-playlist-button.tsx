import type { ReactNode } from 'react'

import { AddToPlaylistModal } from '@/components/modals/add-to-playlist'
import { useOpenClose } from '@/hooks/custom/use-open-close'

type AddToPlaylistButtonProps = {
  children: ReactNode
  trackId: string
  trackTitle: string
}

export const AddToPlaylistButton = ({
  children,
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
      <button onClick={open}>{children}</button>
    </>
  )
}
