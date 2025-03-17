import { Button, Form, Input } from 'antd'
import { toast } from 'react-hot-toast'
import { LuLock } from 'react-icons/lu'

import { useUpdatePassword } from '@/hooks/api/user'

export const UpdatePasswordForm = ({ close }: { close: () => void }) => {
  const [form] = Form.useForm()

  const { mutate: updatePasswordMutation, isPending: updatePasswordPending } =
    useUpdatePassword()

  const handlePasswordUpdate = (values: {
    oldPassword: string
    newPassword: string
    repeatPassword: string
  }) => {
    if (values?.newPassword !== values?.repeatPassword) {
      return toast.error('Passwords do not match')
    }

    updatePasswordMutation(
      {
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword
      },
      {
        onError: (error) => toast.error(error?.message),
        onSuccess: (success) => {
          toast.success(success?.message)
          close()
        }
      }
    )
  }

  return (
    <Form
      className="pb-24"
      form={form}
      layout="vertical"
      requiredMark={false}
      scrollToFirstError={{
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      }}
      onFinish={handlePasswordUpdate}
    >
      <Form.Item
        label="Your Current Password"
        name="oldPassword"
        rules={[
          {
            required: true,
            message: 'Enter your current password'
          }
        ]}
      >
        <Input.Password
          className="[&>*]:py-1"
          placeholder="Enter your password"
          prefix={<LuLock className="mr-2 text-2xl" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Your New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: 'Enter your new password'
          }
        ]}
      >
        <Input.Password
          className="[&>*]:py-1"
          placeholder="Enter your password"
          prefix={<LuLock className="mr-2 text-2xl" />}
          size="large"
        />
      </Form.Item>

      <Form.Item
        label="Confirm New Password"
        name="repeatPassword"
        rules={[
          {
            required: true,
            message: 'Confirm your new password'
          }
        ]}
      >
        <Input.Password
          className="[&>*]:py-1"
          placeholder="Enter your password"
          prefix={<LuLock className="mr-2 text-2xl" />}
          size="large"
        />
      </Form.Item>

      <div className="mz-accent-drawer-form-footer">
        <Button
          disabled={updatePasswordPending}
          size="large"
          type="default"
          onClick={close}
        >
          Cancel
        </Button>

        <Form.Item className="my-0">
          <Button
            className="w-full"
            disabled={updatePasswordPending}
            htmlType="submit"
            loading={updatePasswordPending}
            size="large"
            type="primary"
          >
            Save
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}
