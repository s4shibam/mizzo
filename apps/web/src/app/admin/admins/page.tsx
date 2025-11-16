'use client'

import { useEffect } from 'react'

import {
  Button,
  Drawer,
  Input,
  Pagination,
  Table,
  Tooltip,
  type TableColumnsType
} from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import {
  LuEye,
  LuEyeOff,
  LuPlus,
  LuSearch,
  LuStar,
  LuStarOff
} from 'react-icons/lu'

import { cn } from '@mizzo/utils'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { AddAdminForm } from '@/components/forms/add-admin'
import { useGetAllAdmins, useUpdateAdmin } from '@/hooks/api/admin'
import { useDebounce } from '@/hooks/custom/use-debounce'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { useQueryParams } from '@/hooks/custom/use-query-params'
import { getFormattedDate, getFormattedTime } from '@/lib/dayjs'
import { isSameCuid, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { User } from '@/types/user'

const AdminAdminsPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const { isOpen, open, close } = useOpenClose()
  const { data: session, update } = useSession()
  const { qParams, updateQParams } = useQueryParams()
  const [searchInput, setSearchInput, search] = useDebounce(
    qParams.search || '',
    500
  )

  const currentPage = Number(qParams.currentPage) || 1

  const {
    data: admins,
    isLoading: isAdminsLoading,
    error: adminsError
  } = useGetAllAdmins({
    currentPage,
    search
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

  const { mutate: updateAdminMutation, isPending: isAdminUpdatePending } =
    useUpdateAdmin({
      onError: (error) => toast.error(error?.message)
    })

  const handleUpdateAdmin = ({ id }: { id: string }) => {
    updateAdminMutation(
      { id },
      {
        onSuccess: (success) => {
          toast.success(success?.message)
          if (isSameCuid(session?.user?.id, id)) {
            update({ isAdmin: false })
          }
          invalidateQueries({ queryKey: ['useGetAllAdmins'] })
        }
      }
    )
  }

  const handlePageChange = (page: number) => {
    updateQParams({
      currentPage: page.toString()
    })
  }

  const columns: TableColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 300,
      render: (title, record) => {
        const url = record.isArtist
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
                fallbackSrc={USER_AVATAR_PLACEHOLDER}
                src={s3GetUrlFromKey(record?.profile?.avatarKey)}
              />
            </Link>

            <div className="min-w-0 flex-1">
              <Tooltip title={title}>
                <p className="line-clamp-1 text-base font-semibold text-zinc-900">
                  {title || "User's Name"}
                </p>
              </Tooltip>
              <Tooltip title={record?.email || 'Email not provided'}>
                <p className="line-clamp-1 text-xs text-zinc-500">
                  {record?.email || 'Email not provided'}
                </p>
              </Tooltip>

              <div className="mt-1 flex items-center gap-2">
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
      title: 'User Since',
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
      title: 'Actions',
      fixed: 'right',
      width: 200,
      render: (record: User) =>
        (admins?.data?.length ?? 0) > 1 ? (
          <Button
            className={cn(
              '!h-8 text-xs font-medium transition-all hover:!text-inherit',
              'border-red-200 bg-red-50 text-red-600 hover:!border-red-400 hover:!bg-red-100'
            )}
            onClick={() => handleUpdateAdmin({ id: record?.id })}
          >
            Dismiss as Admin
          </Button>
        ) : (
          <p className="text-xs text-red-600">You are the only admin</p>
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

        <Button icon={<LuPlus />} type="primary" onClick={open}>
          Add Admin
        </Button>
      </div>

      {!adminsError && (
        <Table
          columns={columns}
          dataSource={admins?.data}
          loading={isAdminsLoading || isAdminUpdatePending}
          pagination={false}
          rowKey={(record) => record?.id}
          scroll={{ x: 'max-content' }}
          sticky={{ offsetHeader: 64 }}
        />
      )}

      {adminsError && <ErrorInfo error={adminsError} />}

      {admins?.pagination && (
        <Pagination
          className="mt-6 flex w-full justify-end"
          current={currentPage}
          pageSize={admins?.pagination?.perPage}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} admins`
          }
          total={admins.pagination.totalItems}
          onChange={handlePageChange}
        />
      )}

      <Drawer
        destroyOnClose
        className="relative size-full"
        open={isOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Add New Admin"
        width={drawerWidth}
        onClose={close}
      >
        <AddAdminForm close={close} />
      </Drawer>
    </div>
  )
}

export default AdminAdminsPage
