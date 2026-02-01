'use client'

import { useEffect, useMemo } from 'react'

import {
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

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllTracks, useUpdateTrack } from '@/hooks/api/admin'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import {
  getDurationInHMS,
  getFormattedDate,
  getFormattedTime
} from '@/lib/dayjs'
import { getLanguageList, getStatusInfo, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { TStatus } from '@/types/index'
import type { TLiveLyricStatus, Track } from '@/types/track'

const AdminTracksPage = () => {
  const { qParams, updateQParams } = useQueryParams()
  const [searchInput, setSearchInput, search] = useDebounce(
    qParams.search || '',
    500
  )

  const currentPage = Number(qParams.currentPage) || 1
  const status = qParams.status as TStatus | undefined
  const language = qParams.language
  const isPublic = qParams.isPublic ? qParams.isPublic === 'true' : undefined

  const {
    data: tracks,
    isLoading: isTracksLoading,
    error: tracksError
  } = useGetAllTracks({
    currentPage,
    search,
    status,
    isPublic,
    language
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

  const { mutate: updateTrackMutation, isPending: isTrackUpdatePending } =
    useUpdateTrack({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllTracks'] })
      }
    })

  const handleUpdateTrack = (id: string, newStatus: TStatus) => {
    updateTrackMutation({ id, data: { status: newStatus } })
  }

  const handleUpdateLiveLyricStatus = (
    id: string,
    newStatus: TLiveLyricStatus
  ) => {
    updateTrackMutation({ id, data: { liveLyricStatus: newStatus } })
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

  const languageOptions: SelectProps<string>['options'] = useMemo(() => {
    return getLanguageList().map((lang) => ({
      label: lang,
      value: lang
    }))
  }, [])

  const columns: TableColumnsType<Track> = [
    {
      title: 'Title',
      dataIndex: 'title',
      fixed: 'left',
      width: 350,
      render: (title, record) => {
        return (
          <div className="flex items-center gap-3.5">
            <Link
              className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-all hover:scale-105 hover:shadow-md"
              href={`/track/${record?.id}?as=admin`}
            >
              <ImageWithFallback
                fill
                alt={record?.title}
                className="object-cover"
                draggable={false}
                fallbackSrc={TRACK_POSTER_PLACEHOLDER}
                src={s3GetUrlFromKey(record?.posterKey)}
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Tooltip title={title}>
                <p className="line-clamp-1 text-base font-semibold">{title}</p>
              </Tooltip>

              <div className="mt-1 flex items-center gap-1">
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-700">
                  {record?.language}
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
                  {getDurationInHMS(record?.duration)}
                </span>
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
      }
    },
    {
      title: 'Artists',
      dataIndex: 'primaryArtist',
      width: 250,
      render: (_primaryArtist, record) => {
        const artists = [
          record?.primaryArtist,
          ...(record?.secondaryArtists ?? [])
        ]

        return (
          <div className="flex flex-col gap-1.5">
            {artists.map((artist, index) => {
              if (!artist) {
                return null
              }

              return (
                <Link
                  key={`${artist.id}-${index}`}
                  className="flex w-fit items-center gap-1 rounded-full bg-zinc-100 p-0.5 pr-2 text-base text-zinc-700 transition-all hover:bg-zinc-200 hover:text-zinc-900"
                  href={`/artist/${artist.id}?as=admin`}
                >
                  <ImageWithFallback
                    alt={artist.name}
                    className="size-6 rounded-full border border-white/60 object-cover shadow-sm"
                    draggable={false}
                    fallbackSrc={ARTIST_AVATAR_PLACEHOLDER}
                    height={24}
                    src={s3GetUrlFromKey(artist.profile?.avatarKey)}
                    width={24}
                  />
                  <span className="truncate text-sm">{artist.name}</span>
                </Link>
              )
            })}
          </div>
        )
      }
    },
    {
      title: 'Uploaded On',
      dataIndex: 'createdAt',
      width: 150,
      render: (createdAt) => (
        <div className="space-y-0.5">
          <p className="text-xs text-zinc-700">{getFormattedDate(createdAt)}</p>
          <p className="text-xs text-zinc-500">{getFormattedTime(createdAt)}</p>
        </div>
      )
    },
    {
      title: 'Stats',
      dataIndex: '_count',
      render: (_count, record) => {
        const likes = record?.likes ?? _count?.likedTrack ?? 0
        const listens = record?.listens ?? 0
        const playlistAdds = _count?.playlistTracks ?? 0

        return (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">Likes</span>
              <span className="rounded-md bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-700">
                {likes}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">Listens</span>
              <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {listens}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500">Playlist Adds</span>
              <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                {playlistAdds}
              </span>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Status',
      fixed: 'right',
      width: 150,
      render: (record: Track) => {
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
              onChange={(newStatus) => handleUpdateTrack(record?.id, newStatus)}
            />
            {record?.status === 'PENDING' ? (
              <Tooltip
                placement="left"
                title="This track is being processed now."
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
    },
    {
      title: 'Lyrics',
      fixed: 'right',
      width: 170,
      render: (record: Track) => {
        const liveLyricStatus = record?.liveLyric?.status
        const statusColors: Record<TLiveLyricStatus, string> = {
          PENDING: '#3b82f6',
          PROCESSING: '#f59e0b',
          COMPLETED: '#10b981',
          FAILED: '#ef4444'
        }

        const statusOptions: SelectProps<TLiveLyricStatus>['options'] = [
          { value: 'PENDING', label: 'Pending' },
          { value: 'PROCESSING', label: 'Processing' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'FAILED', label: 'Failed' }
        ]

        return (
          <div className="flex w-fit items-center gap-2">
            <Select
              className="w-fit min-w-32"
              defaultValue={liveLyricStatus}
              options={statusOptions}
              placeholder="No lyrics"
              onChange={(newStatus) =>
                handleUpdateLiveLyricStatus(record?.id, newStatus)
              }
            />
            {liveLyricStatus && (
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: statusColors[liveLyricStatus] }}
              />
            )}
          </div>
        )
      }
    }
  ]

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 -mt-4 flex items-center gap-3 bg-white py-4">
        <Input
          allowClear
          className="min-w-60 flex-1"
          placeholder="Search by title or artist name..."
          prefix={<LuSearch className="text-zinc-400" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select
          allowClear
          className="w-40"
          options={[
            { label: 'All Tracks', value: undefined },
            { label: 'Public', value: 'true' },
            { label: 'Private', value: 'false' }
          ]}
          placeholder="Visibility"
          value={
            isPublic === undefined ? undefined : isPublic ? 'true' : 'false'
          }
          onChange={(value) => handleFilterChange('isPublic', value)}
        />

        <Select
          allowClear
          className="w-40"
          options={[
            { label: 'All Status', value: undefined },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Processing', value: 'PROCESSING' },
            { label: 'Reviewing', value: 'REVIEWING' },
            { label: 'Published', value: 'PUBLISHED' },
            { label: 'Blocked', value: 'BLOCKED' },
            { label: 'Failed', value: 'FAILED' }
          ]}
          placeholder="Status"
          value={status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select<string>
          allowClear
          showSearch
          className="w-40"
          optionFilterProp="label"
          options={languageOptions}
          placeholder="Language"
          value={language}
          onChange={(value) => handleFilterChange('language', value)}
        />
      </div>

      {!tracksError && (
        <Table
          columns={columns}
          dataSource={tracks?.data}
          loading={isTracksLoading || isTrackUpdatePending}
          pagination={false}
          rowKey={(record) => record?.id}
          scroll={{ x: 'max-content' }}
          sticky={{ offsetHeader: 64 }}
        />
      )}

      {tracksError && <ErrorInfo error={tracksError} />}

      {tracks?.pagination && (
        <Pagination
          className="mt-6 flex w-full justify-end"
          current={currentPage}
          pageSize={tracks?.pagination?.perPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} tracks`
          }
          total={tracks.pagination.totalItems}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AdminTracksPage
