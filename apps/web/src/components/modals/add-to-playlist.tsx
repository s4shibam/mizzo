import { Modal } from 'antd'
import { toast } from 'react-hot-toast'
import { LuCircle, LuCircleCheck, LuX } from 'react-icons/lu'

import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { useAddTrackToPlaylist, useGetMyPlaylists } from '@/hooks/api/playlist'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { Playlist } from '@/types/playlist'

type AddToPlaylistModalProps = {
  isOpen: boolean
  trackId: string
  trackTitle: string
  close: () => void
}

export const AddToPlaylistModal = ({
  isOpen,
  trackId,
  trackTitle,
  close
}: AddToPlaylistModalProps) => {
  const { data: library, isLoading, error } = useGetMyPlaylists()

  return (
    <Modal
      centered
      closeIcon={
        <div className="grid place-items-center transition-colors">
          <LuX />
        </div>
      }
      footer={null}
      open={isOpen}
      width={500}
      onCancel={close}
    >
      <div className="space-y-8 py-4">
        <div className="text-center">
          <h3 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            Add to Playlist
          </h3>

          <p className="text-lg">
            You are about to add the track,{' '}
            <span className="font-medium">{trackTitle}</span>
          </p>
        </div>

        <div className="max-h-96 min-h-36 overflow-auto rounded-lg pr-1">
          <div className="flex w-full flex-1 flex-col overflow-x-hidden">
            <Loader
              className="mt-4"
              loading={isLoading}
              text="Fetching playlists..."
            />

            <ErrorInfo error={error} />

            {library?.data?.map((playlist) => (
              <PlaylistPreview
                key={playlist.id}
                close={close}
                playlist={playlist}
                trackId={trackId}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

type PlaylistPreviewProps = {
  close: () => void
  playlist: Playlist
  trackId: string
}

const PlaylistPreview = ({
  trackId,
  playlist,
  close
}: PlaylistPreviewProps) => {
  const payload = { playlistId: playlist.id, trackId }

  const { mutate: addTrackToPlaylistMutation } = useAddTrackToPlaylist({
    onError: (error) => toast.error(error?.message),
    onSuccess: (success) => {
      invalidateQueries({ queryKey: ['useGetMyPlaylists'] })
      invalidateQueries({ queryKey: ['useSearchPlaylistByPlaylistId'] })
      toast.success(success?.message)
    },
    onSettled: close
  })

  return (
    <div
      className="hover:bg-primary/10 group flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 pr-4 transition-all duration-300"
      onClick={() => addTrackToPlaylistMutation(payload)}
    >
      <div className="relative aspect-square size-14">
        <ImageWithFallback
          fill
          alt="poster"
          className="aspect-square w-full rounded-md object-cover"
          draggable={false}
          fallbackSrc={PLAYLIST_POSTER_PLACEHOLDER}
          src={s3GetUrlFromKey(playlist?.posterKey)}
        />
      </div>

      <div className="flex max-w-xs flex-col">
        <p className="truncate text-lg">{playlist?.name}</p>

        <p className="truncate text-sm text-zinc-600">
          {playlist?._count?.playlistTracks} Track(s)
        </p>
      </div>

      <LuCircleCheck className="ml-auto hidden size-5 fill-green-400 group-hover:block" />

      <LuCircle className="ml-auto size-5 text-zinc-500 group-hover:hidden" />
    </div>
  )
}
