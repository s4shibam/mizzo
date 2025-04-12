'use client'

import { Button, Drawer, Table, Tooltip, type TableColumnsType } from 'antd'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff, LuPlus, LuStar, LuStarOff } from 'react-icons/lu'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { AddAdminForm } from '@/components/forms/add-admin'
import { useGetAllAdmins, useUpdateAdmin } from '@/hooks/api/admin'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { getFormattedDate } from '@/lib/dayjs'
import { isSameCuid, s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { User } from '@/types/user'

const AdminAdminsPage = () => {
  const { drawerWidth } = useDrawerWidth()
  const { isOpen, open, close } = useOpenClose()
  const { data: session, update } = useSession()
  const {
    data: admins,
    isLoading: isAdminsLoading,
    error: adminsError
  } = useGetAllAdmins()

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

  const columns: TableColumnsType<User> = [
    {
      title: 'Title',
      dataIndex: 'name',
      render: (title, record) => {
        const url = record.isArtist
          ? `/artist/${record?.id}`
          : `/user/${record?.id}`

        return (
          <div className="flex items-center gap-2">
            <Link href={`${url}?as=admin`}>
              <Image
                alt={record?.name}
                className="rounded-md"
                draggable={false}
                height={70}
                src={
                  s3GetUrlFromKey(record?.profile?.avatarKey) ??
                  USER_AVATAR_PLACEHOLDER
                }
                width={70}
              />
            </Link>

            <div>
              <Tooltip title={title}>
                <p className="line-clamp-1 text-base">
                  {title || "User's Name"}
                </p>
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
      render: (email) => (
        <p className="truncate text-base">{email || 'Not Provided'}</p>
      )
    },
    {
      title: 'User Since',
      dataIndex: 'createdAt',
      render: (createdAt) => getFormattedDate(createdAt)
    },
    {
      title: 'Action',
      fixed: 'right',
      render: (record: User) =>
        (admins?.data?.length ?? 0) > 1 ? (
          <Button
            className="text-red-600 hover:!border-red-600 hover:!text-inherit"
            onClick={() => handleUpdateAdmin({ id: record?.id })}
          >
            Dismiss as Admin
          </Button>
        ) : (
          <p className="text-red-600">You are the only admin</p>
        )
    }
  ]

  if (adminsError) {
    return <ErrorInfo error={adminsError} />
  }

  return (
    <div className="relative">
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

      <div className="grid h-14 grid-cols-2 items-center justify-center border-b bg-black/5 px-6">
        <p className="ml-auto text-center text-3xl">
          All <span className="text-primary capitalize">Admins</span>
        </p>

        <Button
          className="ml-auto"
          icon={<LuPlus />}
          size="large"
          type="primary"
          onClick={open}
        >
          New Admin
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={admins?.data}
        loading={isAdminsLoading || isAdminUpdatePending}
        pagination={false}
        rowKey={(record) => record?.id}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 64 }}
      />
    </div>
  )
}

export default AdminAdminsPage
