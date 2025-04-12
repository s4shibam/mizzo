'use client'

import { useState } from 'react'

import {
  Button,
  Drawer,
  Table,
  Tag,
  Tooltip,
  type TableColumnsType
} from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff } from 'react-icons/lu'

import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllPlaylists, useUpdatePlaylist } from '@/hooks/api/admin'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { getFormattedDate } from '@/lib/dayjs'
import { getStatusInfo, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { TStatus } from '@/types/index'
import type { Playlist, Playlist_Count } from '@/types/playlist'
import type { Track } from '@/types/track'
import type { User } from '@/types/user'

const AdminPlaylistsPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>()
  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    error: playlistsError
  } = useGetAllPlaylists()

  const { mutate: updatePlaylistMutation, isPending: isPlaylistUpdatePending } =
    useUpdatePlaylist({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllPlaylists'] })
        setSelectedPlaylist(null)
      }
    })

  const handleUpdatePlaylist = (id: string, newStatus: TStatus) => {
    updatePlaylistMutation({ id, data: { status: newStatus } })
  }

  const columns: TableColumnsType<Playlist> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (title, record) => (
        <div className="flex items-center gap-3">
          <Link href={`/playlist/${record.id}?as=admin`}>
            <ImageWithFallback
              alt={record?.name}
              className="rounded-md"
              draggable={false}
              fallbackSrc={PLAYLIST_POSTER_PLACEHOLDER}
              height={70}
              src={s3GetUrlFromKey(record?.posterKey)}
              width={70}
            />
          </Link>

          <div className="grid grid-rows-2">
            <div className="grid w-fit grid-cols-[auto_1.2rem] items-center gap-2">
              <Tooltip title={title}>
                <p className="line-clamp-1">{title}</p>
              </Tooltip>

              <Tooltip title={record?.isPublic ? 'Public' : 'Private'}>
                {record?.isPublic ? (
                  <LuEye className="size-full text-green-600" />
                ) : (
                  <LuEyeOff className="size-full text-red-600" />
                )}
              </Tooltip>
            </div>

            <p className="line-clamp-2">
              {record?.description || 'Not provided'}
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      render: (owner: User) => (
        <Tooltip
          placement="left"
          title={
            <ImageWithFallback
              alt={owner?.name}
              className="rounded-md"
              draggable={false}
              fallbackSrc={USER_AVATAR_PLACEHOLDER}
              height={75}
              src={s3GetUrlFromKey(owner?.profile?.avatarKey)}
              width={75}
            />
          }
        >
          <p className="max-w-28 truncate">{owner?.name}</p>
        </Tooltip>
      )
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      render: (createdAt) => getFormattedDate(createdAt)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const tag = getStatusInfo(status)
        return <Tag color={tag.color}>{tag.text}</Tag>
      }
    },
    {
      title: 'Stats',
      dataIndex: '_count',
      width: '15%',
      render: (count: Playlist_Count) => (
        <div className="grid grid-cols-[1fr_2.5rem] gap-x-3 truncate text-center">
          <p className="mr-auto font-medium">Likes</p>

          <span> {count?.likedPlaylist}</span>

          <p className="mr-auto font-medium">Tracks Count</p>

          <span> {count?.playlistTracks}</span>
        </div>
      )
    },
    {
      title: 'Update Status To',
      fixed: 'right',
      width: 250,
      render: (record: Track) => (
        <div className="flex flex-col gap-2">
          {record?.status !== 'PUBLISHED' && (
            <Button
              type="primary"
              onClick={() => handleUpdatePlaylist(record?.id, 'PUBLISHED')}
            >
              Published
            </Button>
          )}

          {record?.status !== 'BLOCKED' && (
            <Button
              danger
              onClick={() => handleUpdatePlaylist(record?.id, 'BLOCKED')}
            >
              Blocked
            </Button>
          )}

          {record?.status !== 'REVIEWING' && (
            <Button
              onClick={() => handleUpdatePlaylist(record?.id, 'REVIEWING')}
            >
              Reviewing
            </Button>
          )}
        </div>
      )
    }
  ]

  if (playlistsError) {
    return <ErrorInfo error={playlistsError} />
  }

  const close = () => {
    setSelectedPlaylist(null)
  }

  return (
    <div className="relative">
      <Drawer
        destroyOnClose
        className="relative size-full"
        open={!!selectedPlaylist}
        placement="right"
        prefixCls="accent-drawer"
        title="Playlist Details"
        width={drawerWidth}
        onClose={close}
      />

      <Table
        columns={columns}
        dataSource={playlists?.data}
        loading={isPlaylistsLoading || isPlaylistUpdatePending}
        pagination={false}
        rowKey={(record) => record?.id}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 16 }}
        onRow={(record) => {
          return {
            onDoubleClick: () => setSelectedPlaylist(record)
          }
        }}
      />
    </div>
  )
}

export default AdminPlaylistsPage
