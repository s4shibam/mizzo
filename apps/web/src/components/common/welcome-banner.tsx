import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { getGreetingMessage } from '@mizzo/utils'

import { getBannerImage } from '@/lib/utils'

const BANNER = getBannerImage()

export const WelcomeBanner = () => {
  const { data: session, status } = useSession()

  return (
    <div className="animate-fade relative h-48 w-full overflow-hidden rounded-lg p-2 lg:h-64">
      <Image
        fill
        alt="Welcome To Mizzo"
        className="animate-fade object-cover"
        draggable={false}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        src={BANNER}
      />

      {status !== 'loading' && (
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-2 bg-gradient-to-b from-transparent via-white/5 to-transparent px-6 py-4 backdrop-blur-[2px]">
          <span className="animate-fade whitespace-nowrap text-center text-3xl font-bold drop-shadow-xl xl:text-5xl">
            {getGreetingMessage(session?.user?.name?.split(' ')?.[0])}
          </span>
        </div>
      )}
    </div>
  )
}
