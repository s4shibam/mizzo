'use client'

import { useState } from 'react'

import {
  Drawer,
  Select,
  Table,
  Tag,
  Tooltip,
  type SelectProps,
  type TableColumnsType
} from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuBan, LuEye, LuEyeOff } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import TRACK_POSTER_PLACEHOLDER from '@/assets/placeholders/track-poster.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllTracks, useUpdateTrack } from '@/hooks/api/admin'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import {
  getDurationInHMSWithText,
  getFormattedDate,
  getFormattedTime
} from '@/lib/dayjs'
import { getStatusInfo, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { TStatus } from '@/types/index'
import type { Track } from '@/types/track'

const AdminTracksPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const {
    data: tracks,
    isLoading: isTracksLoading,
    error: tracksError
  } = useGetAllTracks()

  const { mutate: updateTrackMutation, isPending: isTrackUpdatePending } =
    useUpdateTrack({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllTracks'] })
        setSelectedTrack(null)
      }
    })

  const handleUpdateTrack = (id: string, newStatus: TStatus) => {
    updateTrackMutation({ id, data: { status: newStatus } })
  }

  const columns: TableColumnsType<Track> = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, record) => {
        return (
          <div className="flex items-center gap-2">
            <Link
              className="relative size-[70px] overflow-hidden rounded-md"
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

            <div>
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

              <p className="truncate capitalize">
                {record?.language} &#8226;{' '}
                {getDurationInHMSWithText({
                  secs: record?.duration
                })}
              </p>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Primary Artist',
      dataIndex: 'primaryArtist',
      render: (primaryArtist) => (
        <Tooltip
          placement="left"
          title={
            <ImageWithFallback
              alt={primaryArtist?.name}
              className="rounded-md"
              draggable={false}
              fallbackSrc={ARTIST_AVATAR_PLACEHOLDER}
              height={75}
              src={s3GetUrlFromKey(primaryArtist?.profile?.avatarKey)}
              width={75}
            />
          }
        >
          <Link
            className="w-full truncate text-base hover:underline"
            href={`/artist/${primaryArtist?.id}?as=admin`}
          >
            {primaryArtist?.name}
          </Link>
        </Tooltip>
      )
    },
    {
      title: 'Uploaded On',
      dataIndex: 'createdAt',
      render: (createdAt) => (
        <div>
          <p>{getFormattedDate(createdAt)}</p>

          <p>{getFormattedTime(createdAt)}</p>
        </div>
      )
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
      title: 'Update Status To',
      fixed: 'right',
      width: 200,
      render: (record: Track) => {
        const statusOptions: SelectProps<TStatus>['options'] = [
          { value: 'PENDING', label: 'Pending' },
          { value: 'REVIEWING', label: 'Reviewing' },
          { value: 'PUBLISHED', label: 'Published' },
          { value: 'BLOCKED', label: 'Blocked' }
        ]

        return (
          <div className="flex w-fit items-center gap-2">
            <Select
              className="w-fit min-w-32"
              defaultValue={record?.status}
              options={statusOptions}
              placeholder="Select status"
              onChange={(newStatus) => handleUpdateTrack(record?.id, newStatus)}
            />
            {record?.status === 'PENDING' && (
              <Tooltip title="This track is being processed now.">
                <LuBan className="size-4 shrink-0 text-amber-500" />
              </Tooltip>
            )}
          </div>
        )
      }
    }
  ]

  if (tracksError) {
    return <ErrorInfo error={tracksError} />
  }

  const close = () => {
    setSelectedTrack(null)
  }

  const trackDetails = selectedTrack
    ? [
        { name: 'id', value: selectedTrack.id },
        { name: 'title', value: selectedTrack.title },
        { name: 'primary artist', value: selectedTrack.primaryArtist?.name },
        {
          name: 'status',
          value: getStatusInfo(selectedTrack.status).text
        },
        { name: 'language', value: selectedTrack.language },
        {
          name: 'duration',
          value: getDurationInHMSWithText({
            secs: selectedTrack.duration
          })
        },
        { name: 'likes', value: selectedTrack.likes },
        { name: 'listens', value: selectedTrack.listens || 0 },
        { name: 'tags', value: selectedTrack.tags },
        {
          name: 'visibility',
          value: selectedTrack.isPublic ? 'Public' : 'Private'
        },
        {
          name: 'poster url',
          value: s3GetUrlFromKey(selectedTrack.posterKey)
        },
        {
          name: 'track url',
          value: s3GetUrlFromKey(selectedTrack.trackKey)
        },
        {
          name: 'uploaded on',
          value: getFormattedDate(selectedTrack.createdAt)
        }
      ]
    : []

  return (
    <div className="relative">
      <Table
        columns={columns}
        dataSource={tracks?.data}
        loading={isTracksLoading || isTrackUpdatePending}
        pagination={false}
        rowKey={(record) => record?.id}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 0 }}
        onRow={(record) => {
          return {
            onDoubleClick: () => setSelectedTrack(record)
          }
        }}
      />

      <Drawer
        destroyOnClose
        className="relative size-full"
        open={!!selectedTrack}
        placement="right"
        prefixCls="accent-drawer"
        title="Track Details"
        width={drawerWidth}
        onClose={close}
      >
        <div className="space-y-4">
          {trackDetails.map((detail) => (
            <div key={detail.name}>
              <h4 className="font-medium capitalize">{detail.name}</h4>
              <p
                className={cn('mz-pill line-clamp-1 w-full max-w-80 truncate', {
                  capitalize: !['poster url', 'track url'].includes(detail.name)
                })}
              >
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  )
}

export default AdminTracksPage
