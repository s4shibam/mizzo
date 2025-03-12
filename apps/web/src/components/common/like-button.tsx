import toast from 'react-hot-toast'

import { useToggleLikeOfPlaylist } from '@/hooks/api/playlist'
import { useToggleLikeOfTrack } from '@/hooks/api/track'
import { invalidateQueries } from '@/services/tanstack'

type LikeButtonProps = {
  children: React.ReactNode
  className?: string
  trackId?: string
  playlistId?: string
  idType: 'playlistId' | 'trackId'
}

export const LikeButton = ({
  children,
  className,
  trackId,
  playlistId,
  idType
}: LikeButtonProps) => {
  const { mutate: toggleLikeOfTrackMutation, isPending: isTrackLikePending } =
    useToggleLikeOfTrack({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({
          queryKey: ['useGetLikeStatusOfTrack', { trackId }]
        })
        setTimeout(() => {
          invalidateQueries({ queryKey: ['useGetLikedTracks'] })
        }, 500)
      }
    })

  const {
    mutate: toggleLikeOfPlaylistMutation,
    isPending: isPlaylistLikePending
  } = useToggleLikeOfPlaylist({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      toast.success(success?.message)
      invalidateQueries({ queryKey: ['useGetLikedPlaylists'] })
      invalidateQueries({
        queryKey: ['useGetLikeStatusOfPlaylist', { playlistId }]
      })
    }
  })

  return (
    <button
      className={className}
      disabled={isTrackLikePending || isPlaylistLikePending}
      onClick={(e) => {
        e.stopPropagation()
        if (idType === 'playlistId' && playlistId)
          toggleLikeOfPlaylistMutation({ playlistId })
        else if (idType === 'trackId' && trackId)
          toggleLikeOfTrackMutation({ trackId })
      }}
    >
      {children}
    </button>
  )
}
