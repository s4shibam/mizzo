import { useState } from 'react'

import { Alert, Button, Form, Select } from 'antd'
import Image from 'next/image'
import toast from 'react-hot-toast'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { useGetUsersByEmail, useUpdateAdmin } from '@/hooks/api/admin'
import { useFilter } from '@/hooks/custom/use-filter'
import { getFormattedDate } from '@/lib/dayjs'
import { s3GetUrlFromKey } from '@/lib/utils'
import { invalidateQueries } from '@/services/tanstack'
import type { User } from '@/types/user'

type AddAdminFormProps = {
  close: () => void
}

type Filter = {
  email: string
  take?: number
  isAdmin?: boolean
}

export const AddAdminForm = ({ close }: AddAdminFormProps) => {
  const [form] = Form.useForm()
  const [selectedUser, setSelectedUser] = useState<User>()
  const { filter, updateFilter } = useFilter<Filter>({
    email: '',
    take: 5,
    isAdmin: false
  })

  const { data: usersByEmail, isLoading: isUsersByEmailLoading } =
    useGetUsersByEmail(filter)

  const { mutate: updateAdminMutation, isPending: isAdminUpdatePending } =
    useUpdateAdmin({
      onError: (error) => toast.error(error?.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        invalidateQueries({ queryKey: ['useGetAllAdmins'] })
        close()
      }
    })

  const handleUpdateAdmin = () => {
    console.log(selectedUser)
    if (!selectedUser?.id) {
      return toast.error('Please select a user')
    }
    updateAdminMutation({ id: selectedUser.id })
  }

  return (
    <Form
      className="w-full"
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }}
      onFinish={handleUpdateAdmin}
    >
      <Form.Item
        name="user"
        rules={[{ required: true, message: 'Please select a user' }]}
      >
        <Select
          showSearch
          className="[&>*]:py-1"
          loading={isUsersByEmailLoading}
          options={usersByEmail?.data?.map((user) => ({
            label: `${user?.name} - ${user?.email}`,
            value: JSON.stringify(user)
          }))}
          placeholder="Enter email to search"
          size="large"
          onChange={(user) => setSelectedUser(JSON.parse(user))}
          onSearch={(value) => {
            if (value) {
              updateFilter({ email: value })
            }
          }}
        />
      </Form.Item>

      {selectedUser && (
        <>
          <div className="mb-4 flex h-32 items-center gap-4 rounded-md border p-4">
            <div className="relative aspect-square h-full">
              <Image
                fill
                alt={selectedUser?.name}
                className="rounded-lg"
                draggable={false}
                src={
                  s3GetUrlFromKey(selectedUser?.profile?.avatarKey) ||
                  USER_AVATAR_PLACEHOLDER
                }
              />
            </div>
            <div className="flex size-full flex-col justify-center rounded-lg px-4 py-1">
              <p className="text-lg font-medium">{selectedUser?.name}</p>

              <p className="text-base">
                <span className="text-primary">Email: </span>
                {selectedUser?.email}
              </p>

              <p className="text-base">
                <span className="text-primary">Since: </span>
                {getFormattedDate(selectedUser?.createdAt)}
              </p>
            </div>
          </div>

          <Alert
            className="text-lg"
            message="Are you sure you want to add this user as an admin?"
            type="warning"
          />
        </>
      )}

      <div className="mz-accent-drawer-form-footer">
        <Button
          disabled={isAdminUpdatePending}
          size="large"
          type="default"
          onClick={close}
        >
          Cancel
        </Button>

        <Form.Item className="my-0">
          <Button
            className="w-full"
            disabled={isAdminUpdatePending}
            htmlType="submit"
            loading={isAdminUpdatePending}
            size="large"
            type="primary"
          >
            Add as Admin
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
