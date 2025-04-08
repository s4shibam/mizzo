'use client'

import { type ReactNode } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Loader } from '@/components/common/loader'

const UserPrivateLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { status } = useSession()

  if (status === 'loading') {
    return <Loader fullScreen />
  }

  if (status === 'unauthenticated') {
    router.replace('/auth/login')
    return null
  }

  return children
}

export default UserPrivateLayout
