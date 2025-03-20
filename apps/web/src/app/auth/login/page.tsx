'use client'

import { useEffect, useState } from 'react'

import { Button, Divider, Form, Input } from 'antd'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { LuLock, LuMail } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { useQueryParams } from '@/hooks/custom/use-query-params'

const Login = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const { qParams } = useQueryParams()
  const email = qParams.email

  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true)

    await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })
      .then((response) => {
        if (!response?.ok) {
          throw new Error('Invalid credentials')
        } else {
          router.replace('/')
          toast.success('Logged in successfully')
        }
      })
      .catch(() => {
        toast.error('Invalid credentials')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    form.setFieldsValue({ email })
    document.title = `Login - ${APP_SLUG_CAP}`
  }, [email, form])

  return (
    <>
      <p className="mb-8 mt-4 text-center text-2xl font-semibold">
        Resume Your Music
      </p>

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
        onFinish={handleLogin}
      >
        <Form.Item
          label="Your Email"
          name="email"
          rules={[{ required: true, message: 'What is your email?' }]}
        >
          <Input
            placeholder="Enter your email"
            prefix={<LuMail />}
            size="large"
          />
        </Form.Item>
        <Form.Item
          label="Your Password"
          name="password"
          rules={[{ required: true, message: 'What is your password?' }]}
        >
          <Input.Password
            placeholder="Enter your password"
            prefix={<LuLock />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            block
            className="h-12"
            htmlType="submit"
            loading={loading}
            size="large"
            type="primary"
          >
            Log In
          </Button>
        </Form.Item>
      </Form>

      <div className="grid place-items-center">
        <Link href="/auth/forgot-password">
          <Button className="font-medium" size="large" type="text">
            Forgot your Password?
          </Button>
        </Link>
      </div>

      <Divider className="my-5" />
      <p className="flex flex-col items-center justify-center text-base">
        <span>Don&apos;t have an account?</span>
        <Link
          className="hover:text-primary cursor-pointer tracking-wide"
          href="/auth/signup"
        >
          Sign up for <span className="font-medium">{APP_SLUG_CAP}</span>
        </Link>
      </p>
    </>
  )
}

export default Login
