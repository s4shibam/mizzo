import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { getShareableLinkToCopy, isSameCuid } from 'lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  LuCircleX,
  LuEllipsisVertical,
  LuHeart,
  LuHeartOff,
  LuListMusic,
  LuMicVocal,
  LuMusic2,
  LuTrash
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { AddToPlaylistButton } from '@/components/common/add-to-playlist-button'
import { CopyLinkButton } from '@/components/common/copy-link-button'
import { DeleteButton } from '@/components/common/delete-button'
import { LikeButton } from '@/components/common/like-button'
import { useGetLikeStatusOfTrack } from '@/hooks/api/track'
import type { Playlist } from '@/types/playlist'
import type { Track } from '@/types/track'

type TrackMenuProps = {
  track: Track
  playlist?: Playlist
  className?: string
  onMenuClick?: () => void
  onMenuClose?: () => void
}

export const TrackMenu = ({
  track,
  playlist,
  className,
  onMenuClick = () => {},
  onMenuClose = () => {}
}: TrackMenuProps) => {
  const { data: session } = useSession()

  const { data: trackLikeData } = useGetLikeStatusOfTrack({
    trackId: track.id
  })

  const getTrackMenu = () => {
    const items: MenuProps['items'] = []

    // Add to Playlist option
    items.push({
      key: 'addToPlaylist',
      label: (
        <AddToPlaylistButton trackId={track.id} trackTitle={track.title}>
          <div className="mz-dropdown-menu-item">
            <LuListMusic />
            <span>Add to Playlist</span>
          </div>
        </AddToPlaylistButton>
      )
    })

    // Remove from playlist option (only for playlist owner)
    if (isSameCuid(session?.user?.id, playlist?.ownerId)) {
      items.push({
        key: 'deleteTrackFromCurrentPlaylist',
        label: (
          <DeleteButton
            actionType="removeTrackFromPlaylist"
            className="mz-dropdown-menu-item"
            isConfirmationNeeded={false}
            playlist={playlist}
            track={track}
          >
            <LuCircleX />
            <span>Remove from this playlist</span>
          </DeleteButton>
        )
      })
    }

    // Like/Unlike track option
    if (track.status === 'PUBLISHED' && track.isPublic) {
      items.push({
        key: 'likeTrack',
        label: (
          <LikeButton idType="trackId" trackId={track.id}>
            <div className="mz-dropdown-menu-item">
              {trackLikeData?.data?.isLiked ? <LuHeartOff /> : <LuHeart />}
              <span>
                {trackLikeData?.data?.isLiked
                  ? 'Remove from your Liked Tracks'
                  : 'Add to your Liked Tracks'}
              </span>
            </div>
          </LikeButton>
        )
      })
    }

    // First divider
    items.push({
      type: 'divider'
    })

    // Navigation options
    items.push(
      {
        key: 'goToArtist',
        label: (
          <Link href={`/artist/${track.primaryArtist?.id}`}>
            <div className="mz-dropdown-menu-item">
              <LuMicVocal />
              <span>Go to Artist</span>
            </div>
          </Link>
        )
      },
      {
        key: 'goToTrack',
        label: (
          <Link
            href={
              `/track/${track.id}` +
              (isSameCuid(session?.user?.id, track.primaryArtistId)
                ? '?as=artist'
                : '')
            }
          >
            <div className="mz-dropdown-menu-item">
              <LuMusic2 />
              <span>Go to Track</span>
            </div>
          </Link>
        )
      }
    )

    if (track.status === 'PUBLISHED' && track.isPublic) {
      items.push({
        key: 'copyLink',
        label: (
          <CopyLinkButton
            className="mz-dropdown-menu-item"
            link={getShareableLinkToCopy('track', track.id)}
          />
        )
      })
    }

    // Second divider

    // Delete track option (only for track owner/artist)
    if (isSameCuid(session?.user?.id, track.primaryArtistId)) {
      items.push({
        type: 'divider'
      })

      items.push({
        key: 'deleteTrack',
        label: (
          <DeleteButton
            actionType="deleteTrack"
            className="mz-dropdown-menu-item -mx-2 rounded-md border-2 !border-red-500 !py-2 px-2"
            track={track}
          >
            <LuTrash className="size-full !text-red-500" />
            <span>Delete this track</span>
          </DeleteButton>
        )
      })
    }

    return items
  }

  const items = getTrackMenu()

  return (
    <Dropdown
      menu={{ items, onClick: onMenuClose }}
      prefixCls="track-menu"
      trigger={['click']}
      onOpenChange={(visible) => {
        if (visible) {
          onMenuClick()
        } else {
          onMenuClose()
        }
      }}
    >
      <button
        className={cn(
          'bg-primary/25 grid size-7 place-items-center rounded-full focus:outline-none',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <LuEllipsisVertical className="size-4" />
      </button>
    </Dropdown>
  )
}
