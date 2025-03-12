import type { ReactNode } from 'react'

import { Modal } from 'antd'
import parse from 'html-react-parser'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import {
  useDeletePlaylistById,
  useRemoveTrackFromPlaylist
} from '@/hooks/api/playlist'
import { useDeleteTrackById } from '@/hooks/api/track'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { invalidateQueries } from '@/services/tanstack'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

type DeleteButtonProps = {
  actionType: 'deletePlaylist' | 'deleteTrack' | 'removeTrackFromPlaylist'
  className?: string
  children?: ReactNode
  track?: Track
  playlist?: Playlist
  isConfirmationNeeded?: boolean
}

export const DeleteButton = ({
  actionType,
  className,
  children,
  playlist,
  track,
  isConfirmationNeeded = true
}: DeleteButtonProps) => {
  const router = useRouter()
  const { isOpen, open, close } = useOpenClose()

  const {
    mutateAsync: deletePlaylistMutation,
    isPending: isDeletePlaylistPending
  } = useDeletePlaylistById({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      router.push('/library')
      invalidateQueries({ queryKey: ['useGetMyPlaylists'] })
      toast.success(success?.message)
    },
    onSettled: close
  })

  const { mutateAsync: deleteTrackMutation, isPending: isDeleteTrackPending } =
    useDeleteTrackById({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        router.push('/studio/content')
        invalidateQueries({ queryKey: ['useGetMyUploads'] })
        toast.success(success?.message)
      },
      onSettled: close
    })

  const {
    mutateAsync: removeTrackFromPlaylistMutation,
    isPending: isRemoveTrackFromPlaylistPending
  } = useRemoveTrackFromPlaylist({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      invalidateQueries({
        queryKey: ['useSearchPlaylistByPlaylistId', { search: playlist?.id }]
      })
      toast.success(success?.message)
    },
    onSettled: close
  })

  const getTitle = () => {
    if (actionType === 'deletePlaylist' && playlist) {
      return 'Delete Playlist'
    } else if (actionType === 'deleteTrack' && track) {
      return 'Delete Track'
    } else if (actionType === 'removeTrackFromPlaylist' && playlist && track) {
      return 'Remove Track From Playlist'
    }

    return 'Delete'
  }

  const getDescription = () => {
    let description = ''
    if (actionType === 'deletePlaylist' && playlist) {
      description += `You are about to delete <strong>${playlist.name || 'this playlist'}</strong> permanently.`
    } else if (actionType === 'deleteTrack' && track) {
      description += `You are about to delete <strong>${track.title || 'this track'}</strong> permanently.`
    }

    return parse(description + " This action can't be reverted.")
  }

  const handleDelete = async () => {
    if (actionType === 'deletePlaylist' && playlist?.id) {
      await deletePlaylistMutation({ playlistId: playlist.id })
    } else if (actionType === 'deleteTrack' && track?.id) {
      await deleteTrackMutation({ trackId: track.id })
    } else if (
      actionType === 'removeTrackFromPlaylist' &&
      playlist?.id &&
      track?.id
    ) {
      await removeTrackFromPlaylistMutation({
        trackId: track.id,
        playlistId: playlist.id
      })
    } else {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Modal
        cancelButtonProps={{
          size: 'middle',
          disabled:
            isDeletePlaylistPending ||
            isDeleteTrackPending ||
            isRemoveTrackFromPlaylistPending
        }}
        cancelText="Cancel"
        okButtonProps={{
          className: 'bg-red-500',
          size: 'middle',
          loading:
            isDeletePlaylistPending ||
            isDeleteTrackPending ||
            isRemoveTrackFromPlaylistPending,
          disabled:
            isDeletePlaylistPending ||
            isDeleteTrackPending ||
            isRemoveTrackFromPlaylistPending
        }}
        okText="Delete"
        open={isOpen}
        title={<p className="text-lg">{getTitle()}</p>}
        onCancel={close}
        onOk={handleDelete}
      >
        <p className="-mt-2 mb-10 text-base">{getDescription()}</p>
      </Modal>

      <div
        className={className}
        onClick={isConfirmationNeeded ? open : handleDelete}
      >
        {children}
      </div>
    </>
  )
}
