import type { ReactNode } from 'react'

import toast from 'react-hot-toast'

import { useTogglePublicViewOfPlaylist } from '@/hooks/api/playlist'
import { useTogglePublicViewOfTrack } from '@/hooks/api/track'
import { invalidateQueries } from '@/services/tanstack'

type ViewToggleButtonProps = {
  children: ReactNode
  className?: string
} & (
  | {
      idType: 'playlistId'
      playlistId: string
    }
  | {
      idType: 'trackId'
      trackId: string
    }
)

export const ViewToggleButton = ({
  children,
  className,
  idType,
  ...rest
}: ViewToggleButtonProps) => {
  const {
    mutate: togglePublicViewOfPlaylistMutation,
    isPending: isPlaylistViewTogglePending
  } = useTogglePublicViewOfPlaylist({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      invalidateQueries({
        queryKey: ['useSearchPlaylistByPlaylistId']
      })
      toast.success(success?.message)
    }
  })

  const {
    mutate: togglePublicViewOfTrackMutation,
    isPending: isTrackViewTogglePending
  } = useTogglePublicViewOfTrack({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      invalidateQueries({
        queryKey: ['useSearchTrackByTrackId']
      })
      toast.success(success?.message)
    }
  })

  return (
    <button
      className={`${className}`}
      disabled={isPlaylistViewTogglePending || isTrackViewTogglePending}
      onClick={() => {
        if (idType === 'playlistId' && 'playlistId' in rest) {
          togglePublicViewOfPlaylistMutation({ playlistId: rest.playlistId })
        } else if (idType === 'trackId' && 'trackId' in rest) {
          togglePublicViewOfTrackMutation({ trackId: rest.trackId })
        } else {
          console.error('Invalid props: No idType or id provided')
        }
      }}
    >
      {children}
    </button>
  )
}
