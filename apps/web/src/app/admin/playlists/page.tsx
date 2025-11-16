'use client'

import { useEffect, useState } from 'react'

import {
  Drawer,
  Input,
  Pagination,
  Select,
  Table,
  Tooltip,
  type SelectProps,
  type TableColumnsType
} from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuBan, LuEye, LuEyeOff, LuSearch } from 'react-icons/lu'

import PLAYLIST_POSTER_PLACEHOLDER from '@/assets/placeholders/playlist-poster.webp'
import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllPlaylists, useUpdatePlaylist } from '@/hooks/api/admin'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { getFormattedDate, getFormattedTime } from '@/lib/dayjs'
import { getStatusInfo, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { TStatus } from '@/types/index'
import type { Playlist, Playlist_Count } from '@/types/playlist'

const AdminPlaylistsPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const { qParams, updateQParams } = useQueryParams()
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>()
  const [searchInput, setSearchInput, search] = useDebounce(
    qParams.search || '',
    500
  )

  const currentPage = Number(qParams.currentPage) || 1
  const isPublic = qParams.isPublic ? qParams.isPublic === 'true' : undefined

  const {
    data: playlists,
    isLoading: isPlaylistsLoading,
    error: playlistsError
  } = useGetAllPlaylists({
    currentPage,
    search,
    isPublic
  })

  useEffect(() => {
    if (search !== (qParams.search || '')) {
      updateQParams({
        search: search || undefined,
        currentPage: '1'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

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

  const handlePageChange = (page: number) => {
    updateQParams({
      currentPage: page.toString()
    })
  }

  const handleFilterChange = (key: string, value: string | undefined) => {
    updateQParams({
      [key]: value,
      currentPage: '1'
    })
  }

  const columns: TableColumnsType<Playlist> = [
    {
      title: 'Name & Ownership',
      dataIndex: 'name',
      fixed: 'left',
      width: 300,
      render: (title, record: Playlist) => (
        <div className="flex items-center gap-3.5">
          <Link
            className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-all hover:scale-105 hover:shadow-md"
            href={`/playlist/${record.id}?as=admin`}
          >
            <ImageWithFallback
              fill
              alt={record?.name}
              className="object-cover"
              draggable={false}
              fallbackSrc={PLAYLIST_POSTER_PLACEHOLDER}
              src={s3GetUrlFromKey(record?.posterKey)}
            />
          </Link>

          <div className="min-w-0 flex-1">
            <Tooltip title={title}>
              <p className="line-clamp-1 text-base font-semibold text-zinc-900">
                {title}
              </p>
            </Tooltip>

            <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-zinc-600">
              {record?.owner && (
                <Tooltip
                  placement="left"
                  title={
                    <div className="flex flex-col gap-1">
                      <ImageWithFallback
                        alt={record?.owner?.name || 'Playlist owner'}
                        className="rounded-md"
                        draggable={false}
                        fallbackSrc={USER_AVATAR_PLACEHOLDER}
                        height={75}
                        src={s3GetUrlFromKey(record?.owner?.profile?.avatarKey)}
                        width={75}
                      />

                      <div>
                        <p className="text-xs font-medium text-zinc-100">
                          Name: {record?.owner?.name || 'Unknown Owner'}
                        </p>
                        <p className="text-xs text-zinc-300">
                          Email: {record?.owner?.email || 'Unknown Email'}
                        </p>
                      </div>
                    </div>
                  }
                >
                  <Link
                    className="max-w-32 truncate rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 hover:bg-zinc-200"
                    href={`/user/${record?.owner?.id}?as=admin`}
                  >
                    By {record?.owner?.name || 'Unknown Owner'}
                  </Link>
                </Tooltip>
              )}

              <Tooltip title={record?.isPublic ? 'Public' : 'Private'}>
                <p className="rounded-full bg-zinc-100 px-2.5 py-0.5">
                  {record?.isPublic ? (
                    <LuEye className="size-4 text-emerald-600" />
                  ) : (
                    <LuEyeOff className="size-4 text-zinc-400" />
                  )}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 250,
      render: (description?: string) => (
        <p className="line-clamp-3 text-xs text-zinc-600">
          {description || 'No description provided'}
        </p>
      )
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      width: 150,
      render: (createdAt) => (
        <div className="text-xs text-zinc-700">
          <p>{getFormattedDate(createdAt)}</p>
          <p className="text-xs text-zinc-500">{getFormattedTime(createdAt)}</p>
        </div>
      )
    },
    {
      title: 'Stats',
      dataIndex: '_count',
      width: 150,
      render: (count: Playlist_Count) => (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Likes</span>
            <span className="rounded-md bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-700">
              {count?.likedPlaylist}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Tracks</span>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              {count?.playlistTracks}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      fixed: 'right',
      width: 150,
      render: (record: Playlist) => {
        const color = getStatusInfo(record?.status).color

        const statusOptions: SelectProps<TStatus>['options'] = [
          { value: 'PENDING', label: 'Pending' },
          { value: 'REVIEWING', label: 'Reviewing' },
          { value: 'PUBLISHED', label: 'Published' },
          { value: 'BLOCKED', label: 'Blocked' }
        ]

        return (
          <div className="flex w-fit items-center gap-2">
            <Select
              className="w-fit min-w-28"
              defaultValue={record?.status}
              options={statusOptions}
              placeholder="Select status"
              onChange={(newStatus) =>
                handleUpdatePlaylist(record?.id, newStatus)
              }
            />
            {record?.status === 'PENDING' ? (
              <Tooltip
                placement="left"
                title="This playlist is being processed now."
              >
                <LuBan className="size-4 shrink-0 text-amber-500" />
              </Tooltip>
            ) : (
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: color }}
              />
            )}
          </div>
        )
      }
    }
  ]

  const close = () => {
    setSelectedPlaylist(null)
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 -mt-4 flex items-center gap-3 bg-white py-4">
        <Input
          allowClear
          className="min-w-60 flex-1"
          placeholder="Search by name or description..."
          prefix={<LuSearch className="text-zinc-400" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select
          allowClear
          className="w-36"
          options={[
            { label: 'All Playlists', value: undefined },
            { label: 'Public', value: 'true' },
            { label: 'Private', value: 'false' }
          ]}
          placeholder="Visibility"
          value={
            isPublic === undefined ? undefined : isPublic ? 'true' : 'false'
          }
          onChange={(value) => handleFilterChange('isPublic', value)}
        />
      </div>

      {!playlistsError && (
        <Table
          columns={columns}
          dataSource={playlists?.data}
          loading={isPlaylistsLoading || isPlaylistUpdatePending}
          pagination={false}
          rowKey={(record) => record?.id}
          scroll={{ x: 'max-content' }}
          sticky={{ offsetHeader: 64 }}
          onRow={(record) => {
            return {
              onDoubleClick: () => setSelectedPlaylist(record)
            }
          }}
        />
      )}

      {playlistsError && <ErrorInfo error={playlistsError} />}

      {playlists?.pagination && (
        <Pagination
          className="mt-6 flex w-full justify-end"
          current={currentPage}
          pageSize={playlists?.pagination?.perPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} playlists`
          }
          total={playlists.pagination.totalItems}
          onChange={handlePageChange}
        />
      )}

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
    </div>
  )
}

export default AdminPlaylistsPage
