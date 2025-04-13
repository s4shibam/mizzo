import React from 'react'

import { Button } from 'antd'
import Image from 'next/image'
import { LuCrown, LuMusic2, LuRadio, LuZap } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

const BG_IMAGE =
  'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2000'

const PremiumFeature = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType
  title: string
  description: string
}) => (
  <div className="bg-background hover:bg-background/90 flex flex-col items-center gap-4 rounded-xl p-6 backdrop-blur-sm transition-all">
    <Icon className="text-primary size-8" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-center">{description}</p>
  </div>
)

const GetPremium = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-20 pb-10">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center gap-6">
        <Image
          fill
          priority
          alt="background"
          className="size-full object-cover brightness-50"
          draggable={false}
          src={BG_IMAGE}
        />

        <LuCrown className="text-primary z-10 size-16" />
        <h1 className="z-10 text-center text-7xl font-bold tracking-wide text-white">
          <span className="text-primary">{APP_SLUG_CAP} </span>
          Premium
        </h1>
        <p className="z-10 max-w-md text-center text-lg tracking-wider text-white">
          Elevate your music experience with premium features and ad-free
          listening
        </p>
        <Button className="z-10 mt-4" size="large">
          Get Premium Now
        </Button>
      </div>

      <div className="container grid gap-16">
        <h2 className="text-center text-3xl font-semibold">Why Go Premium?</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PremiumFeature
            description="Enjoy uninterrupted music streaming without any advertisements"
            icon={LuMusic2}
            title="Ad-Free Music"
          />
          <PremiumFeature
            description="Stream music in premium quality with enhanced audio features"
            icon={LuRadio}
            title="Higher Quality"
          />
          <PremiumFeature
            description="Download your favorite tracks and listen offline anywhere, anytime"
            icon={LuZap}
            title="Offline Mode"
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-lg">
            Ready to upgrade your music experience?
          </p>
          <Button className="z-10 mt-4" size="large">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetPremium
