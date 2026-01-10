'use client'

import { useEffect } from 'react'

import { Button, Drawer, Tooltip } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { usePlayerContext } from 'providers/player-provider'
import { toast } from 'react-hot-toast'
import { LuHeart, LuPause, LuPenLine, LuPlay } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import { TrackBarCard } from '@/components/cards/track'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { LikeButton } from '@/components/common/like-button'
import { Loader } from '@/components/common/loader'
import { UpdatePlaylistForm } from '@/components/forms/update-playlist'
import { PlaylistMenu } from '@/components/menus/playlist'
import { useGetLikeStatusOfPlaylist } from '@/hooks/api/playlist'
import { useSearchPlaylistByPlaylistId } from '@/hooks/api/search'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useOnPlay } from '@/hooks/custom/use-on-play'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { getDurationInHMSWithText } from '@/lib/dayjs'
import { isSameCuid, pluralize, s3GetUrlFromKey } from '@/lib/utils'

const PlaylistByPlaylistIdPage = () => {
  const { data: session } = useSession()
  const { drawerWidth } = useDrawerWidth()
  const params = useParams() as { playlistId: string }
  const { qParams } = useQueryParams()
  const as = qParams.as as 'owner' | undefined

  const { activePlaylist, isActiveTrackPlaying, setIsActiveTrackPlaying } =
    usePlayerContext()
  const {
    isOpen: isUpdatePlaylistDrawerOpen,
    open: openUpdatePlaylistDrawer,
    close: closeUpdatePlaylistDrawer
  } = useOpenClose()

  const {
    data: playlist,
    isLoading,
    error
  } = useSearchPlaylistByPlaylistId({
    search: params?.playlistId,
    as
  })

  const { data: playlistLikeData } = useGetLikeStatusOfPlaylist({
    playlistId: params?.playlistId
  })

  const onPlay = useOnPlay(playlist?.data)

  useEffect(() => {
    document.title = 'Playlist - ' + (playlist?.data?.name || 'Not Found')
  }, [playlist?.data?.name])

  if (isLoading) {
    return <Loader loading />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  const playlistOwner = playlist?.data?.owner

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-5">
      <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
        <ImageWithFallback
          alt="poster"
          className="aspect-square size-[17.5rem] overflow-hidden rounded-xl bg-white object-cover"
          draggable={false}
          fallbackSrc={PLAYLIST_POSTER_PLACEHOLDER}
          height={280}
          src={s3GetUrlFromKey(playlist?.data?.posterKey)}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <Tooltip title={playlist?.data?.name}>
            <h1 className="line-clamp-2 text-3xl font-bold">
              {playlist?.data?.name || 'Untitled Playlist'}
            </h1>
          </Tooltip>

          <h4 className="text-sm text-zinc-600">
            {playlist?.data?.description || 'No description provided'}
          </h4>

          {isSameCuid(session?.user?.id, playlist?.data?.ownerId) && (
            <Button
              className="flex items-center justify-center"
              icon={<LuPenLine />}
              type="text"
              onClick={openUpdatePlaylistDrawer}
            />
          )}

          <div className="flex flex-wrap items-center gap-1">
            <Tooltip title={playlist?.data?.owner?.name}>
              <Link
                className="mz-pill line-clamp-1 max-w-48 cursor-pointer"
                href={
                  playlistOwner?.isArtist
                    ? `/artist/${playlistOwner?.id}`
                    : `/user/${playlistOwner?.id}`
                }
              >
                By {playlistOwner?.name?.split(' ')[0]}
              </Link>
            </Tooltip>

            <div className="mz-pill">
              {pluralize(playlist?.data?.playlistTracks?.length, 'Track')}
            </div>

            {!!playlist?.data?.playlistTracks?.length && (
              <p className="mz-pill">
                {getDurationInHMSWithText({
                  secs: playlist?.data?.playlistTracks?.reduce(
                    (sum, track) => sum + Number(track.duration),
                    0
                  ),
                  minimal: true
                })}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            {playlist?.data?.isPublic && (
              <LikeButton
                key={`like-${playlist?.data?.id}-${playlistLikeData?.data?.isLiked}`}
                className="animate-jump grid size-8 cursor-pointer place-items-center"
                idType="playlistId"
                playlistId={playlist?.data?.id}
              >
                <LuHeart
                  className={cn(
                    'size-full',
                    {
                      'fill-primary text-primary':
                        playlistLikeData?.data?.isLiked
                    },
                    {
                      'text-black': !playlistLikeData?.data?.isLiked
                    }
                  )}
                />
              </LikeButton>
            )}

            {isSameCuid(activePlaylist?.id, playlist?.data?.id) &&
            isActiveTrackPlaying ? (
              <Tooltip title="Pause">
                <button className="rounded-full bg-white p-2.5">
                  <LuPause
                    className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105"
                    onClick={() => setIsActiveTrackPlaying(false)}
                  />
                </button>
              </Tooltip>
            ) : (
              <Tooltip title="Play All">
                <button className="rounded-full bg-white p-2.5">
                  <LuPlay
                    className="text-primary fill-primary size-9 cursor-pointer stroke-[1.5] transition-all hover:scale-105"
                    onClick={() => {
                      if (!playlist?.data?.playlistTracks?.length) {
                        toast.error('No songs in this playlist')
                      } else if (
                        isSameCuid(activePlaylist?.id, playlist?.data?.id)
                      ) {
                        setIsActiveTrackPlaying(true)
                      } else {
                        onPlay(playlist?.data?.playlistTracks?.[0])
                      }
                    }}
                  />
                </button>
              </Tooltip>
            )}

            {playlist?.data && (
              <PlaylistMenu className="size-8" playlist={playlist.data} />
            )}
          </div>
        </div>
      </div>

      <div>
        {playlist?.data?.playlistTracks?.length === 0 && (
          <ErrorInfo
            customMessage="No songs in this playlist"
            customStatusCode={404}
          />
        )}

        {playlist?.data?.playlistTracks?.map((playlistTrack) => (
          <TrackBarCard
            key={playlistTrack?.id}
            playlist={playlist?.data}
            playTrack={() => onPlay(playlistTrack)}
            track={playlistTrack}
          />
        ))}
      </div>

      <Drawer
        destroyOnClose
        className="relative size-full"
        open={isUpdatePlaylistDrawerOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Update Playlist"
        width={drawerWidth}
        onClose={closeUpdatePlaylistDrawer}
      >
        {playlist?.data && (
          <UpdatePlaylistForm
            close={closeUpdatePlaylistDrawer}
            playlist={playlist.data}
          />
        )}
      </Drawer>
    </div>
  )
}

export default PlaylistByPlaylistIdPage
