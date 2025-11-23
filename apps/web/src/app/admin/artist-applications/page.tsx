'use client'

import { useEffect } from 'react'

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
import {
  LuBan,
  LuEye,
  LuEyeOff,
  LuSearch,
  LuStar,
  LuStarOff
} from 'react-icons/lu'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import {
  useGetAllArtistApplications,
  useManageArtistApplication
} from '@/hooks/api/admin'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { getFormattedDate, getFormattedTime } from '@/lib/dayjs'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { ArtistApplication, User } from '@/types/user'

const AdminArtistApplicationsPage = () => {
  const { qParams, updateQParams } = useQueryParams()
  const [searchInput, setSearchInput, search] = useDebounce(
    qParams.search || '',
    500
  )

  const currentPage = Number(qParams.currentPage) || 1
  const isApproved = qParams.isApproved
    ? qParams.isApproved === 'true'
    : undefined

  const {
    data: applications,
    isLoading: isApplicationsLoading,
    error: applicationError
  } = useGetAllArtistApplications({
    currentPage,
    search,
    isApproved
  })

  // Update query params when debounced search changes
  useEffect(() => {
    if (search !== (qParams.search || '')) {
      updateQParams({
        search: search || undefined,
        currentPage: '1'
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const { mutate: applicationMutate, isPending: isApplicationMutationPending } =
    useManageArtistApplication({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        invalidateQueries({ queryKey: ['useGetAllArtistApplications'] })
        toast.success(success.message)
      }
    })

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

  const handleUpdateApplication = (
    userId: string,
    isApproved: boolean | null
  ) => {
    applicationMutate({ userId, isApproved })
  }

  const getApplicationStatusColor = (isApproved: boolean | null) => {
    if (isApproved === true) return 'green'
    if (isApproved === false) return 'red'
    return 'amber'
  }

  const normalizeIsApproved = (
    isApproved: string | boolean | null | undefined
  ): boolean | null => {
    if (typeof isApproved === 'string') {
      if (isApproved === 'true') return true
      if (isApproved === 'false') return false
      return null
    }
    if (isApproved === true || isApproved === false) {
      return isApproved
    }
    return null
  }

  const columns: TableColumnsType<ArtistApplication> = [
    {
      title: 'User',
      dataIndex: 'user',
      fixed: 'left',
      width: 250,
      render: (user: User, record) => {
        return (
          <div className="flex items-center gap-3.5">
            <Link
              className="relative size-16 shrink-0 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-all hover:scale-105 hover:shadow-md"
              href={`/user/${record.userId}?as=admin`}
            >
              <ImageWithFallback
                fill
                alt={user?.name || 'User Name'}
                className="object-cover"
                draggable={false}
                fallbackSrc={USER_AVATAR_PLACEHOLDER}
                src={s3GetUrlFromKey(user?.profile?.avatarKey)}
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Tooltip title={user?.name}>
                <p className="line-clamp-1 text-base font-semibold">
                  {user?.name || "User's Name"}
                </p>
              </Tooltip>
              <Tooltip title={user?.email || 'Email not provided'}>
                <p className="line-clamp-1 text-xs text-zinc-500">
                  {user?.email || 'Email not provided'}
                </p>
              </Tooltip>

              <div className="mt-1 flex items-center gap-2">
                <Tooltip
                  title={
                    user?.isPublicProfile ? 'Public Profile' : 'Private Profile'
                  }
                >
                  <p className="rounded-full bg-zinc-100 px-2.5 py-0.5">
                    {user?.isPublicProfile ? (
                      <LuEye className="size-4 text-emerald-600" />
                    ) : (
                      <LuEyeOff className="size-4 text-zinc-400" />
                    )}
                  </p>
                </Tooltip>

                <Tooltip
                  title={
                    user?.isPremiumUser ? 'Premium Member' : 'Regular Member'
                  }
                >
                  <p className="rounded-full bg-zinc-100 px-2.5 py-0.5">
                    {user?.isPremiumUser ? (
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
      title: 'Message',
      dataIndex: 'message',
      width: 250,
      render: (message: string) => {
        return (
          <Tooltip title={message}>
            <p className="line-clamp-3 text-sm text-zinc-700">{message}</p>
          </Tooltip>
        )
      }
    },
    {
      title: 'ID Proof',
      dataIndex: 'idProofKey',
      width: 150,
      render: (_: string, record) => {
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-16 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5">
              <ImageWithFallback
                fill
                alt="ID Proof"
                className="object-cover"
                src={s3GetUrlFromKey(record.idProofKey)}
              />
            </div>

            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700">
              {record.idProofType || 'N/A'}
            </span>
          </div>
        )
      }
    },
    {
      title: 'Submitted On',
      dataIndex: 'createdAt',
      width: 150,
      render: (createdAt: Date) => {
        return (
          <div className="text-xs text-zinc-700">
            <p>{getFormattedDate(createdAt)}</p>
            <p className="text-xs text-zinc-500">
              {getFormattedTime(createdAt)}
            </p>
          </div>
        )
      }
    },
    {
      title: 'Status',
      fixed: 'right',
      width: 150,
      render: (record: ArtistApplication) => {
        const currentValue = normalizeIsApproved(record?.isApproved)
        const statusColor = getApplicationStatusColor(currentValue)

        const getStatusString = (value: boolean | null): string => {
          if (value === true) return 'approved'
          if (value === false) return 'rejected'
          return 'pending'
        }

        const getStatusFromString = (value: string): boolean | null => {
          if (value === 'approved') return true
          if (value === 'rejected') return false
          return null
        }

        const statusOptions: SelectProps<string>['options'] = [
          { value: 'pending', label: 'Pending' },
          { value: 'approved', label: 'Approved' },
          { value: 'rejected', label: 'Rejected' }
        ]

        return (
          <div className="flex w-fit items-center gap-2">
            <Select
              className="w-fit min-w-28"
              options={statusOptions}
              placeholder="Select status"
              value={getStatusString(currentValue)}
              onChange={(newStatus) =>
                handleUpdateApplication(
                  record?.userId,
                  getStatusFromString(newStatus)
                )
              }
            />
            {currentValue === null ? (
              <Tooltip
                placement="left"
                title="This application is pending review."
              >
                <LuBan className="size-4 shrink-0 text-amber-500" />
              </Tooltip>
            ) : (
              <div
                className="size-4 rounded-full"
                style={{ backgroundColor: statusColor }}
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
          placeholder="Search by user name or email..."
          prefix={<LuSearch className="text-zinc-400" />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <Select
          allowClear
          className="w-40"
          options={[
            { label: 'All Applications', value: undefined },
            { label: 'Approved', value: 'true' },
            { label: 'Pending', value: 'false' }
          ]}
          placeholder="Status"
          value={
            isApproved === undefined ? undefined : isApproved ? 'true' : 'false'
          }
          onChange={(value) => handleFilterChange('isApproved', value)}
        />
      </div>

      {!applicationError && (
        <Table
          columns={columns}
          dataSource={applications?.data}
          loading={isApplicationsLoading || isApplicationMutationPending}
          pagination={false}
          rowKey={(record) => record?.id}
          scroll={{ x: 'max-content' }}
          sticky={{ offsetHeader: 64 }}
        />
      )}

      {applicationError && <ErrorInfo error={applicationError} />}

      {applications?.pagination && (
        <Pagination
          className="mt-6 flex w-full justify-end"
          current={currentPage}
          pageSize={applications?.pagination?.perPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} applications`
          }
          total={applications.pagination.totalItems}
          onChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default AdminArtistApplicationsPage
