import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useSession } from 'next-auth/react'
import {
  LuEllipsisVertical,
  LuHeart,
  LuHeartOff,
  LuTrash,
  LuUserCheck,
  LuUserX
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import { CopyLinkButton } from '@/components/common/copy-link-button'
import { DeleteButton } from '@/components/common/delete-button'
import { LikeButton } from '@/components/common/like-button'
import { ViewToggleButton } from '@/components/common/view-toggle-button'
import { useGetLikeStatusOfPlaylist } from '@/hooks/api/playlist'
import { getShareableLinkToCopy, isSameCuid } from '@/lib/utils'
import type { Playlist } from '@/types/playlist'

type PlaylistMenuProps = {
  className?: string
  playlist: Playlist
}

export const PlaylistMenu = ({ playlist, className }: PlaylistMenuProps) => {
  const { data: session } = useSession()

  const { data: playlistLikeData } = useGetLikeStatusOfPlaylist({
    playlistId: playlist.id
  })

  const getPlaylistMenu = () => {
    const items: MenuProps['items'] = []

    if (playlist.isPublic && playlist.status === 'PUBLISHED') {
      items.push({
        key: 'like-track',
        label: (
          <LikeButton
            className="mz-dropdown-menu-item"
            idType="playlistId"
            playlistId={playlist.id}
          >
            {playlistLikeData?.data?.isLiked ? <LuHeartOff /> : <LuHeart />}
            <span>
              {playlistLikeData?.data?.isLiked
                ? 'Remove from your Liked Playlists'
                : 'Add to your Liked Playlists'}
            </span>
          </LikeButton>
        )
      })

      items.push({
        key: 'copy-link',
        label: (
          <CopyLinkButton
            className="mz-dropdown-menu-item"
            link={getShareableLinkToCopy('playlist', playlist.id)}
          />
        )
      })
    }

    if (isSameCuid(session?.user?.id, playlist.ownerId)) {
      items.push({
        key: 'toggle-view',
        label: (
          <ViewToggleButton
            className="mz-dropdown-menu-item"
            idType="playlistId"
            playlistId={playlist.id}
          >
            {playlist.isPublic ? <LuUserX /> : <LuUserCheck />}
            <span>{playlist.isPublic ? 'Make Private' : 'Make Public'}</span>
          </ViewToggleButton>
        )
      })
    }

    if (isSameCuid(session?.user?.id, playlist.ownerId)) {
      items.push({
        type: 'divider'
      })

      items.push({
        key: 'delete-playlist',
        label: (
          <DeleteButton
            actionType="deletePlaylist"
            className="mz-dropdown-menu-item rounded-md bg-red-500/10 hover:bg-red-500/20"
            playlist={playlist}
          >
            <LuTrash />
            <span>Delete this playlist</span>
          </DeleteButton>
        )
      })
    }

    return items
  }

  const items = getPlaylistMenu()

  return (
    <Dropdown menu={{ items }} prefixCls="playlist-menu" trigger={['click']}>
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
