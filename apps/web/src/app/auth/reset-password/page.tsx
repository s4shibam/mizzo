'use client'

import { useEffect, useState } from 'react'

import { Alert, Button, Form, Input } from 'antd'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { LuLock } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { useResetPassword } from '@/hooks/api/user'
import { useQueryParams } from '@/hooks/custom/use-query-params'

const ResetPassword = () => {
  const { qParams } = useQueryParams()
  const userId = qParams.userId
  const resetToken = qParams.resetToken

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const { mutate: resetPasswordMutation, isPending: isResetPasswordPending } =
    useResetPassword({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        setSuccess(true)
        toast.success(success.message)
      }
    })

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    resetPasswordMutation({ userId, resetToken, password })
  }

  useEffect(() => {
    document.title = `Reset Password - ${APP_SLUG_CAP}`
  }, [])

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Alert
          className="mb-8 mt-4 text-center text-base"
          message="Successfully updated your password. Go to Login page to resume your Musical journey."
          type="success"
        />

        <Link href="/auth/login">
          <Button className="w-fit !px-8" size="large" type="primary">
            Log In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="mb-8 mt-4 text-center text-2xl font-semibold">
        Reset Password
      </p>
      <Form
        className="w-full"
        layout="vertical"
        requiredMark={false}
        scrollToFirstError={{
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        }}
        onFinish={handleResetPassword}
      >
        <Form.Item
          label="New password"
          name="Password"
          rules={[{ required: true, message: 'Enter a new password!' }]}
        >
          <Input.Password
            placeholder="Enter a new password"
            prefix={<LuLock />}
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Repeat new password"
          name="Repeat Password"
          rules={[{ required: true, message: 'Confirm the password!' }]}
        >
          <Input.Password
            placeholder="Confirm the password"
            prefix={<LuLock />}
            size="large"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            className="h-12"
            htmlType="submit"
            loading={isResetPasswordPending}
            size="large"
            type="primary"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ResetPassword
