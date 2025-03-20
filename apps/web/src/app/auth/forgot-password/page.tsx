'use client'

import { useState } from 'react'

import { Alert, Button, Form, Input } from 'antd'
import { toast } from 'react-hot-toast'
import { LuMail } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { useForgotPassword } from '@/hooks/api/user'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const { mutate: forgotPasswordMutation, isPending: isForgotPasswordPending } =
    useForgotPassword({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        setSuccess(true)
        toast.success(success.message)
      }
    })

  const handleForgotPassword = () => {
    forgotPasswordMutation({ email })
  }

  if (success) {
    return (
      <Alert
        className="mb-8 mt-4 text-center text-base"
        message="We've sent you an email. Just follow the instructions to reset your password."
        type="success"
      />
    )
  }

  return (
    <>
      <p className="mb-8 mt-4 text-center text-2xl font-semibold">
        Forgot Password
      </p>
      <Alert
        className="mb-8 text-center text-base"
        message={`Enter your ${APP_SLUG_CAP} email address that you used to register. We'll send you an email with a link to reset your password.`}
        type="info"
      />

      <Form
        className="w-full"
        layout="vertical"
        requiredMark={false}
        scrollToFirstError={{
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        }}
        onFinish={handleForgotPassword}
      >
        <Form.Item
          label="Your Email"
          name="Email"
          rules={[{ required: true, message: 'Enter your email!' }]}
        >
          <Input
            placeholder="Enter your email"
            prefix={<LuMail />}
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            className="h-12"
            htmlType="submit"
            loading={isForgotPasswordPending}
            size="large"
            type="primary"
          >
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ForgotPassword
