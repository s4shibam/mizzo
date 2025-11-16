'use client'

import { useEffect } from 'react'

import {
  Button,
  Input,
  Pagination,
  Select,
  Table,
  Tooltip,
  type TableColumnsType
} from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff, LuSearch, LuStar, LuStarOff } from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { useGetAllUsers, useUpdateUser } from '@/hooks/api/admin'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { User, User_Count, UserProfile } from '@/types/user'

const AdminUsersPage = () => {
  const { qParams, updateQParams } = useQueryParams()
  const [searchInput, setSearchInput, search] = useDebounce(
    qParams.search || '',
    500
  )

  const currentPage = Number(qParams.currentPage) || 1
  const isArtist = qParams.isArtist ? qParams.isArtist === 'true' : undefined
  const isPremiumUser = qParams.isPremiumUser
    ? qParams.isPremiumUser === 'true'
    : undefined

  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError
  } = useGetAllUsers({
    currentPage,
    search,
    isArtist,
    isPremiumUser
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

  const { mutate: updateUserMutation, isPending: isUserUpdatePending } =
    useUpdateUser({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllUsers'] })
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

  const columns: TableColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 300,
      render: (title, record) => {
        const fallback = record?.isArtist
          ? ARTIST_AVATAR_PLACEHOLDER
          : USER_AVATAR_PLACEHOLDER

        const url = record?.isArtist
          ? `/artist/${record?.id}`
          : `/user/${record?.id}`

        return (
          <div className="flex items-center gap-3.5">
            <Link
              className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-all hover:scale-105 hover:shadow-md"
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

            <div className="min-w-0 flex-1">
              <Tooltip title={title}>
                <p className="line-clamp-1 text-base font-semibold text-zinc-900">
                  {title || "User's Name"}
                </p>
              </Tooltip>

              <div className="mt-1 flex items-center gap-1">
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
                  {record?.isArtist ? 'Artist' : 'User'}
                </span>
                <Tooltip
                  title={
                    record?.isPublicProfile
                      ? 'Public Profile'
                      : 'Private Profile'
                  }
                >
                  <p className="rounded-full bg-zinc-100 px-2.5 py-0.5">
                    {record?.isPublicProfile ? (
                      <LuEye className="size-4 text-emerald-600" />
                    ) : (
                      <LuEyeOff className="size-4 text-zinc-400" />
                    )}
                  </p>
                </Tooltip>
                <Tooltip
                  title={
                    record?.isPremiumUser ? 'Premium Member' : 'Regular Member'
                  }
                >
                  <p className="rounded-full bg-zinc-100 px-2.5 py-0.5">
                    {record?.isPremiumUser ? (
                      <LuStar className="text-primary size-4 fill-current" />
                    ) : (
                      <LuStarOff className="size-4 text-zinc-400" />
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
      title: 'Contact & Socials',
      width: 300,
      dataIndex: 'profile',
      render: (profile: UserProfile, user: User) => (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-10 text-xs font-semibold text-zinc-500">EM</span>
            <span className="truncate text-xs text-zinc-700">
              {user?.email || <span className="text-zinc-400">Not set</span>}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 text-xs font-semibold text-zinc-500">FB</span>
            <span className="truncate text-xs text-zinc-700">
              {profile?.facebook || (
                <span className="text-zinc-400">Not set</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 text-xs font-semibold text-zinc-500">IG</span>
            <span className="truncate text-xs text-zinc-700">
              {profile?.instagram || (
                <span className="text-zinc-400">Not set</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-10 text-xs font-semibold text-zinc-500">TW</span>
            <span className="truncate text-xs text-zinc-700">
              {profile?.twitter || (
                <span className="text-zinc-400">Not set</span>
              )}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Playlist Stats',
      dataIndex: '_count',
      width: 150,
      render: (count: User_Count) => (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Liked</span>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {count?.likedPlaylists}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Owned</span>
            <span className="rounded-md bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700">
              {count?.ownedPlaylists}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Track Stats',
      dataIndex: '_count',
      width: 150,
      render: (count: User_Count) => (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Liked</span>
            <span className="rounded-md bg-pink-50 px-2 py-0.5 text-xs font-semibold text-pink-700">
              {count?.likedTracks}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Owned</span>
            <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
              {count?.primaryTracks}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-zinc-500">Collab</span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
              {count?.secondaryTracks}
            </span>
          </div>
        </div>
      )
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 200,
      render: (record: User) => (
        <div className="flex flex-col gap-2">
          <Button
            className={cn(
              '!h-8 text-xs font-medium transition-all hover:!text-inherit',
              {
                'border-red-200 bg-red-50 text-red-600 hover:!border-red-400 hover:!bg-red-100':
                  record?.isPremiumUser
              },
              {
                'border-emerald-200 bg-emerald-50 text-emerald-700 hover:!border-emerald-400 hover:!bg-emerald-100':
                  !record?.isPremiumUser
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
            {record?.isPremiumUser ? 'Remove Premium' : 'Go Premium'}
          </Button>

          <Button
            className={cn(
              '!h-8 text-xs font-medium transition-all hover:!text-inherit',
              {
                'border-red-200 bg-red-50 text-red-600 hover:!border-red-400 hover:!bg-red-100':
                  record?.isPublicProfile
              },
              {
                'border-blue-200 bg-blue-50 text-blue-700 hover:!border-blue-400 hover:!bg-blue-100':
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
            Make {record?.isPublicProfile ? 'Private' : 'Public'} Profile
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 -mt-4 flex items-center gap-3 bg-white py-4">
        <Input
          allowClear
          className="min-w-60 flex-1"
          placeholder="Search by name or email..."
          prefix={<LuSearch className="text-zinc-400" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select
          allowClear
          className="w-36"
          options={[
            { label: 'All Users', value: undefined },
            { label: 'Artists', value: 'true' },
            { label: 'Regular Users', value: 'false' }
          ]}
          placeholder="User Type"
          value={
            isArtist === undefined ? undefined : isArtist ? 'true' : 'false'
          }
          onChange={(value) => handleFilterChange('isArtist', value)}
        />

        <Select
          allowClear
          className="w-36"
          options={[
            { label: 'All Members', value: undefined },
            { label: 'Premium', value: 'true' },
            { label: 'Regular', value: 'false' }
          ]}
          placeholder="Membership"
          value={
            isPremiumUser === undefined
              ? undefined
              : isPremiumUser
                ? 'true'
                : 'false'
          }
          onChange={(value) => handleFilterChange('isPremiumUser', value)}
        />
      </div>

      {!usersError && (
        <Table
          columns={columns}
          dataSource={users?.data}
          loading={isUsersLoading || isUserUpdatePending}
          pagination={false}
          rowKey={(record) => record?.id}
          scroll={{ x: 'max-content' }}
          sticky={{ offsetHeader: 64 }}
        />
      )}

      {usersError && <ErrorInfo error={usersError} />}

      {users?.pagination && (
        <Pagination
          className="mt-6 flex w-full justify-end"
          current={currentPage}
          pageSize={users?.pagination?.perPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} users`
          }
          total={users.pagination.totalItems}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AdminUsersPage
