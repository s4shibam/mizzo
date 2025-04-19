'use client'

import { useEffect, useState } from 'react'

import { Button, Checkbox, Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { LuCircleUserRound, LuLock, LuMail } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { useSendSignupOtp, useSignupUser } from '@/hooks/api/user'

const Signup = () => {
  useEffect(() => {
    document.title = `Sign Up - ${APP_SLUG_CAP}`
  }, [])
  return (
    <>
      <p className="mb-8 mt-4 text-center text-2xl font-semibold">
        Dive into the Music
      </p>

      <SignUpForm />

      <p className="flex flex-col items-center justify-center text-base">
        <span> Already have an account?</span>
        <Link
          className="hover:text-primary cursor-pointer tracking-wide"
          href="/auth/login"
        >
          Log in to {APP_SLUG_CAP}
        </Link>
      </p>
    </>
  )
}

export default Signup

const SignUpForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [otpSent, setOtpSent] = useState(false)
  const [consent, setConsent] = useState(false)
  const [currentUserData, setCurrentUserData] = useState<{
    name: string
    email: string
    password: string
  } | null>()
  const [timer, setTimer] = useState(30)

  const { mutateAsync: sendOtpMutation, isPending: isSendOtpPending } =
    useSendSignupOtp({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        setOtpSent(true)
        return toast.success(success.message)
      }
    })

  const { mutate: signupUserMutation, isPending: isSignupPending } =
    useSignupUser({
      onError: (error) => toast.error(error.message),
      onSuccess: (success) => {
        toast.success(success?.message)
        return router.replace(`/auth/login?email=${currentUserData?.email}`)
      }
    })

  const handleSendOtp = async (
    values: typeof currentUserData & { confirmPassword: string }
  ) => {
    if (!values) {
      return
    }

    if (!consent) {
      return toast.error('You must agree to the Terms and Conditions')
    }

    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const payload = {
      name: values.name,
      email: values.email,
      password: values.password
    }

    setCurrentUserData(payload)
    await sendOtpMutation(payload)
    setTimer(30)
  }

  const handleResendOtp = async () => {
    if (!currentUserData) {
      return toast.error('Error resending OTP')
    }

    await sendOtpMutation(currentUserData)
    setTimer(30)
  }

  const handleSignUp = (values: { email: string; otp: string }) => {
    const payload = {
      email: values.email,
      userOtp: values.otp
    }

    signupUserMutation(payload)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timer])

  if (!otpSent) {
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
        onFinish={handleSendOtp}
      >
        <Form.Item
          label="What should we call you?"
          name="name"
          rules={[{ required: true, message: 'What should we call you?' }]}
        >
          <Input
            placeholder="Enter a profile name"
            prefix={<LuCircleUserRound />}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="What is your email?"
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
          label="Create a password"
          name="password"
          rules={[{ required: true, message: 'Create a password!' }]}
        >
          <Input.Password
            placeholder="Enter a password"
            prefix={<LuLock />}
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Confirm the password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Confirm the password!' }]}
        >
          <Input.Password
            placeholder="Confirm the password"
            prefix={<LuLock />}
            size="large"
          />
        </Form.Item>

        <Checkbox
          checked={consent}
          className="!text-base"
          onChange={() => setConsent(!consent)}
        >
          I agree with the{' '}
          <Link
            className="text-primary hover:text-primary hover:underline"
            href="/t&c"
          >
            Terms and Conditions
          </Link>
        </Checkbox>

        <Form.Item>
          <Button
            block
            className="mt-5 h-12"
            htmlType="submit"
            loading={isSendOtpPending}
            size="large"
            type="primary"
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Form
      className="w-full"
      form={form}
      layout="vertical"
      requiredMark={false}
      onFinish={handleSignUp}
    >
      <Form.Item label="OTP sent to" name="email">
        <Input disabled prefix={<LuMail />} size="large" />
      </Form.Item>

      <Form.Item
        label="Enter your Signup OTP"
        name="otp"
        rules={[{ required: true, message: 'Enter your OTP' }]}
      >
        <Input.OTP length={6} size="large" type="number" />
      </Form.Item>

      <Button
        className="hover:text-primary mb-4 !h-6 !p-0 hover:!bg-transparent"
        disabled={timer !== 0 || isSendOtpPending}
        loading={isSendOtpPending}
        size="large"
        type="text"
        onClick={handleResendOtp}
      >
        {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
      </Button>

      <Form.Item>
        <Button
          block
          className="h-12"
          htmlType="submit"
          loading={isSignupPending}
          size="large"
          type="primary"
        >
          Verify OTP & Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}
