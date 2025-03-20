'use client'

import { ReactNode } from 'react'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import ANIMATED_WAVE from '@/assets/images/animated-wave.svg'
import { Branding } from '@/components/common/branding'
import { Loader } from '@/components/common/loader'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return <Loader fullScreen />
  }

  if (session.status === 'authenticated') {
    router.replace('/')
    return null
  }

  return (
    <div className="relative grid h-screen w-full place-items-center p-5">
      <div className="fixed inset-x-0 bottom-0 hidden w-screen overflow-hidden lg:block">
        <Image
          alt=""
          className="animate-fade-up animate-delay-100 -mb-4 h-auto w-full"
          draggable={false}
          height={750}
          src={ANIMATED_WAVE}
        />
      </div>

      <div className="relative m-6 flex w-full items-center justify-center rounded-2xl bg-white p-6 lg:max-h-[45rem] lg:max-w-[30rem]">
        <div className="flex w-[90%] max-w-md flex-col items-center">
          <Branding />
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
