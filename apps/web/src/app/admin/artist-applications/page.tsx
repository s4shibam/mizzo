'use client'

import {
  Image as AntdImage,
  Button,
  Table,
  Tag,
  Tooltip,
  type TableColumnsType
} from 'antd'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { LuEye, LuEyeOff, LuStar, LuStarOff } from 'react-icons/lu'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import {
  useGetAllArtistApplications,
  useManageArtistApplication
} from '@/hooks/api/admin'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { ArtistApplication, User } from '@/types/user'

const AdminArtistApplicationsPage = () => {
  const {
    data: applications,
    isLoading: isApplicationsLoading,
    error: applicationError
  } = useGetAllArtistApplications()

  const { mutate: applicationMutate, isPending: isApplicationMutationPending } =
    useManageArtistApplication({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        invalidateQueries({ queryKey: ['useGetAllArtistApplications'] })
        toast.success(success.message)
      }
    })

  if (isApplicationsLoading) {
    return <Loader />
  }

  if (applicationError) {
    return <ErrorInfo error={applicationError} />
  }

  const columns: TableColumnsType<ArtistApplication> = [
    {
      title: 'User',
      dataIndex: 'user',
      render: (user: User, record) => {
        return (
          <div className="flex items-center gap-2">
            <Link href={`/user/${record.userId}?as=admin`}>
              <ImageWithFallback
                alt={user?.name || 'User Name'}
                className="rounded-md"
                draggable={false}
                fallbackSrc={USER_AVATAR_PLACEHOLDER}
                height={70}
                src={s3GetUrlFromKey(user?.profile?.avatarKey)}
                width={70}
              />
            </Link>

            <div>
              <Tooltip title={user?.name}>
                <p className="line-clamp-1 text-base">
                  {user?.name || "User's Name"}
                </p>
              </Tooltip>

              <div className="grid grid-cols-[1.2rem_1.2rem] items-center gap-2">
                <Tooltip
                  title={
                    user?.isPublicProfile ? 'Public Profile' : 'Private Profile'
                  }
                >
                  {user?.isPublicProfile ? (
                    <LuEye className="size-full text-green-600" />
                  ) : (
                    <LuEyeOff className="size-full text-red-600" />
                  )}
                </Tooltip>

                <Tooltip
                  title={
                    user?.isPremiumUser ? 'Premium Member' : 'Regular Member'
                  }
                >
                  {user?.isPremiumUser ? (
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
      title: 'Message',
      dataIndex: 'message',
      render: (message: string) => {
        return (
          <Tooltip title={message}>
            <p className="line-clamp-2">{message}</p>
          </Tooltip>
        )
      }
    },
    {
      title: 'ID Proof Type',
      width: 150,
      dataIndex: 'idProofType',
      render: (idProofType: string) => {
        return <p>{idProofType}</p>
      }
    },
    {
      title: 'ID Proof',
      dataIndex: 'idProofKey',
      render: (idProofKey: string) => {
        return (
          <AntdImage
            alt="ID Proof"
            className="bg-primary-light rounded-md"
            height={70}
            src={s3GetUrlFromKey(idProofKey) ?? ''}
            width={70}
          />
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'isApproved',
      render: (isApproved: string) => {
        return (
          <Tag color={isApproved ? 'lime' : 'orange'}>
            {isApproved ? 'Approved' : 'Pending'}
          </Tag>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'userId',
      render: (userId, record) => {
        return (
          <div className="flex gap-2">
            {!record.isApproved ? (
              <>
                <Button
                  type="primary"
                  onClick={() =>
                    applicationMutate({ userId, isApproved: true })
                  }
                >
                  Approve
                </Button>

                <Button
                  danger
                  onClick={() =>
                    applicationMutate({ userId, isApproved: false })
                  }
                >
                  Reject
                </Button>
              </>
            ) : (
              <Button
                onClick={() => applicationMutate({ userId, isApproved: null })}
              >
                Revert to Pending
              </Button>
            )}
          </div>
        )
      }
    }
  ]

  return (
    <div className="relative">
      <Table
        columns={columns}
        dataSource={applications?.data}
        loading={isApplicationsLoading || isApplicationMutationPending}
        pagination={false}
        rowKey={(record) => record?.id}
        scroll={{ x: 'max-content' }}
        sticky={{ offsetHeader: 16 }}
      />
    </div>
  )
}

export default AdminArtistApplicationsPage
