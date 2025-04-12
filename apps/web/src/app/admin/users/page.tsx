'use client'

import { useState } from 'react'

import { Button, Drawer, Table, Tooltip, type TableColumnsType } from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff, LuStar, LuStarOff } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllUsers, useUpdateUser } from '@/hooks/api/admin'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { User, User_Count, UserProfile } from '@/types/user'

const AdminUsersPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError
  } = useGetAllUsers()

  const { mutate: updateUserMutation, isPending: isUserUpdatePending } =
    useUpdateUser({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllUsers'] })
        setSelectedUser(null)
      }
    })

  const handleUpdateUser = ({
    id,
    data
  }: {
    id: string
    data: Partial<User>
  }) => {
    updateUserMutation({ id, data })
  }

  const columns: TableColumnsType<User> = [
    {
      title: 'Title',
      dataIndex: 'name',
      render: (title, record) => {
        const fallback = record?.isArtist
          ? ARTIST_AVATAR_PLACEHOLDER
          : USER_AVATAR_PLACEHOLDER

        const url = record?.isArtist
          ? `/artist/${record?.id}`
          : `/user/${record?.id}`

        return (
          <div className="flex items-center gap-2">
            <Link
              className="relative size-[70px] overflow-hidden rounded-md"
              href={`${url}?as=admin`}
            >
              <ImageWithFallback
                fill
                alt={record?.name}
                className="object-cover"
                draggable={false}
                fallbackSrc={fallback}
                src={s3GetUrlFromKey(record?.profile?.avatarKey)}
              />
            </Link>

            <div>
              <Tooltip title={title}>
                <p className="line-clamp-1">{title || "User's Name"}</p>
              </Tooltip>

              <div className="grid grid-cols-[auto_1.2rem_1.2rem] items-center gap-2">
                <p className="truncate text-base capitalize">
                  {record?.isArtist ? 'Artist' : 'User'}
                </p>
                <Tooltip
                  title={
                    record?.isPublicProfile
                      ? 'Public Profile'
                      : 'Private Profile'
                  }
                >
                  {record?.isPublicProfile ? (
                    <LuEye className="size-full text-green-600" />
                  ) : (
                    <LuEyeOff className="size-full text-red-600" />
                  )}
                </Tooltip>
                <Tooltip
                  title={
                    record?.isPremiumUser ? 'Premium Member' : 'Regular Member'
                  }
                >
                  {record?.isPremiumUser ? (
                    <LuStar className="text-primary size-full" />
                  ) : (
                    <LuStarOff className="size-full" />
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      render: (email) => <p className="truncate text-base">{email || 'N/A'}</p>
    },
    {
      title: 'Socials',
      dataIndex: 'profile',
      render: (profile: UserProfile) => (
        <div className="grid grid-cols-[auto_1fr] gap-x-3 truncate text-center">
          <p className="mr-auto font-medium">FB</p>

          <p> {profile?.facebook || 'N/A'}</p>

          <p className="mr-auto font-medium">IG</p>

          <p> {profile?.instagram || 'N/A'}</p>

          <p className="mr-auto font-medium">TW</p>

          <p> {profile?.twitter || 'N/A'}</p>
        </div>
      )
    },
    {
      title: 'Playlist Stats (Count)',
      dataIndex: '_count',
      width: '15%',
      render: (count: User_Count) => (
        <div className="grid grid-cols-[1fr_2.5rem] truncate text-center">
          <p className="mr-auto font-medium">Liked Playlists</p>

          <span> {count?.likedPlaylists}</span>

          <p className="mr-auto font-medium">Owned Playlists</p>

          <span> {count?.ownedPlaylists}</span>
        </div>
      )
    },
    {
      title: 'Track Stats (Count)',
      dataIndex: '_count',
      width: '15%',
      render: (count: User_Count) => (
        <div className="grid grid-cols-[1fr_2.5rem] truncate text-center">
          <p className="mr-auto font-medium">Liked Tracks</p>

          <span> {count?.likedTracks}</span>

          <p className="mr-auto font-medium">Owned Tracks</p>

          <span> {count?.primaryTracks}</span>

          <p className="mr-auto font-medium">Collaborated Tracks</p>

          <span> {count?.secondaryTracks}</span>
        </div>
      )
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (record: User) => (
        <div className="flex flex-col gap-2">
          <Button
            className={cn(
              'hover:!text-inherit',
              {
                'text-red-600 hover:!border-red-600': record?.isPremiumUser
              },
              {
                'text-green-600 hover:!border-green-600': !record?.isPremiumUser
              }
            )}
            onClick={() =>
              handleUpdateUser({
                id: record?.id,
                data: {
                  isPremiumUser: !record?.isPremiumUser
                }
              })
            }
          >
            {record?.isPremiumUser
              ? 'Regular Membership'
              : 'Premium Membership'}
          </Button>

          <Button
            className={cn(
              'hover:!text-inherit',
              {
                'text-red-600 hover:!border-red-600': record?.isPublicProfile
              },
              {
                'text-green-600 hover:!border-green-600':
                  !record?.isPublicProfile
              }
            )}
            onClick={() =>
              handleUpdateUser({
                id: record?.id,
                data: {
                  isPublicProfile: !record?.isPublicProfile
                }
              })
            }
          >
            {record?.isPublicProfile
              ? 'Make Private Profile'
              : 'Make Public Profile'}
          </Button>
        </div>
      )
    }
  ]

  if (usersError) {
    return <ErrorInfo error={usersError} />
  }

  const close = () => {
    setSelectedUser(null)
  }

  return (
    <div className="relative">
      <Drawer
        destroyOnClose
        className="relative size-full"
        open={!!selectedUser}
        placement="right"
        prefixCls="accent-drawer"
        title="User Details"
        width={drawerWidth}
        onClose={close}
      />

      <Table
        columns={columns}
        dataSource={users?.data}
        loading={isUsersLoading || isUserUpdatePending}
        pagination={false}
        rowKey={(record) => record?.id}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 16 }}
        onRow={(record) => {
          return {
            onDoubleClick: () => setSelectedUser(record)
          }
        }}
      />
    </div>
  )
}

export default AdminUsersPage
