'use client'

import { Button } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import { Branding } from '../common/branding'

export const Header = () => {
  const { status } = useSession()

  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-100 bg-white py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Branding href="/" />

        <Link href={status === 'authenticated' ? '/home' : '/auth/login'}>
          <Button className="rounded-full px-6" size="large" type="primary">
            {status === 'authenticated' ? 'Home' : 'Log In'}
          </Button>
        </Link>
      </div>
    </header>
  )
}
