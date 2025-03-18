'use client'

import { useEffect } from 'react'

import { Button } from 'antd'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { Branding } from '@/components/common/branding'

const Error = ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    document.title = `Error - ${APP_SLUG_CAP}`
    console.error(error)
  }, [error])

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center">
      <Branding />

      <p className="mt-10 text-center text-3xl font-semibold xl:text-5xl">
        Something went wrong!
      </p>

      <p className="mt-5">We encountered an error. Please try again.</p>

      <Button
        className="mt-20 w-36"
        size="large"
        type="primary"
        onClick={() => reset()}
      >
        Try Again
      </Button>
    </section>
  )
}

export default Error
