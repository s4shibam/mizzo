'use client'

import { Suspense, useEffect } from 'react'

import { Button } from 'antd'
import Link from 'next/link'
import { usePlayerContext } from 'providers/player-provider'

import { Branding } from '@/components/common/branding'
import { useQueryParams } from '@/hooks/custom/use-query-params'

const NotFoundPage = () => {
  return (
    <Suspense
      fallback={
        <section className="flex h-screen w-screen flex-col items-center justify-center">
          <Branding />
          <p className="mt-10 text-center text-3xl font-semibold xl:text-5xl">
            Page not found!
          </p>
          <Link className="mt-20" href="/home">
            <Button className="w-24" size="large" type="primary">
              Home
            </Button>
          </Link>
        </section>
      }
    >
      <NotFoundContent />
    </Suspense>
  )
}

export default NotFoundPage

const NotFoundContent = () => {
  const { qParams } = useQueryParams()
  const { setActiveTrack } = usePlayerContext()

  useEffect(() => {
    document.title = 'Page Not Found'
    setActiveTrack(undefined)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center">
      <Branding />

      <p className="mt-10 text-center text-3xl font-semibold xl:text-5xl">
        {qParams.error ? 'Page not available!' : 'Page not found!'}
      </p>

      <p className="mt-5">
        {qParams.error
          ? 'Something went wrong, please try again later.'
          : 'Oops! Looks like the music got unplugged on this page.'}
      </p>

      <Link className="mt-20" href="/home">
        <Button className="w-24" size="large" type="primary">
          Home
        </Button>
      </Link>
    </section>
  )
}
