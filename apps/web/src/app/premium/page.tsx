import { Button, Divider } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import {
  LuCheck,
  LuCrown,
  LuHeadphones,
  LuMusic2,
  LuRadio,
  LuShield,
  LuZap
} from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { Branding } from '@/components/common/branding'

const HERO_BG =
  'https://images.unsplash.com/photo-1619983081563-430f63602796?q=80&w=2000'

const GetPremium = () => {
  const premiumFeatures = [
    {
      icon: LuMusic2,
      title: 'Ad-Free Music',
      description:
        'Enjoy uninterrupted music streaming without any advertisements'
    },
    {
      icon: LuHeadphones,
      title: 'Higher Quality',
      description:
        'Stream music in premium quality with enhanced audio features'
    },
    {
      icon: LuZap,
      title: 'Offline Mode',
      description:
        'Download your favorite tracks and listen offline anywhere, anytime'
    },
    {
      icon: LuRadio,
      title: 'Unlimited Playlists',
      description:
        'Create unlimited playlists and organize your music collection'
    },
    {
      icon: LuShield,
      title: 'Unlimited Skips',
      description: 'Skip as many tracks as you want with no limitations'
    },
    {
      icon: LuCrown,
      title: 'Exclusive Content',
      description:
        'Access exclusive content, releases, and premium-only features'
    }
  ]

  return (
    <div className="flex min-h-screen w-full flex-col items-center pb-24">
      <div className="relative w-full">
        <div className="to-primary/50 absolute inset-0 z-10 bg-gradient-to-br from-black/80"></div>
        <Image
          priority
          alt="Premium music experience"
          className="h-[600px] w-full object-cover"
          height={600}
          src={HERO_BG}
          width={1920}
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <Branding className="[&>span]:!text-background mb-4" href="/" />

          <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
            <LuCrown className="size-5 text-amber-500" />
            <span className="font-medium text-white">
              Elevate Your Music Experience
            </span>
          </div>

          <h1 className="from-primary to-primary/70 mb-6 bg-gradient-to-r via-white bg-clip-text text-center text-6xl font-bold text-transparent md:text-7xl">
            {APP_SLUG_CAP} Premium
          </h1>

          <p className="mb-10 max-w-xl text-center text-xl text-white">
            Ad-free music, unlimited skips, offline listening, and
            premium-quality audio
          </p>

          <Link href="#premium-plan">
            <Button
              className="h-14 rounded-full px-10 text-lg shadow-lg"
              size="large"
              type="primary"
            >
              Start Your Premium Journey
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Premium Features
          </h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-600">
            Discover what makes Premium the ultimate music experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="hover:border-primary flex flex-col items-center gap-4 rounded-xl border bg-white p-6 shadow-sm transition-all hover:scale-105 hover:transform hover:shadow-lg"
            >
              <div className="bg-primary/10 text-primary grid size-14 place-items-center rounded-full">
                <feature.icon className="size-7" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-center text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-zinc-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Free vs Premium
            </h2>
            <p className="mx-auto max-w-xl text-lg text-zinc-600">
              See why Premium is worth the upgrade
            </p>
          </div>

          <div className="flex justify-center">
            <ComparisonTable />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20" id="premium-plan">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Premium Plan</h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-600">
            Get the most out of your music experience
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <PremiumCard />
        </div>
      </div>

      <div className="w-full bg-zinc-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto max-w-xl text-lg text-zinc-600">
              Everything you need to know about Premium
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <FaqSection />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="bg-primary/10 flex flex-col items-center justify-center rounded-2xl p-12 text-center">
          <LuCrown className="text-primary mb-6 size-16" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Upgrade Your Experience?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-zinc-600">
            Join the waiting list and be the first to know when Premium launches
          </p>
          <Button
            className="h-12 rounded-full px-8 text-lg"
            size="large"
            type="primary"
          >
            Join the Waiting List
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GetPremium

const ComparisonTable = () => {
  const features = [
    {
      feature: 'Music Streaming',
      free: 'Basic Quality',
      premium: 'HD Quality'
    },
    { feature: 'Playlists', free: 'Up to 5 Playlists', premium: 'Unlimited' },
    { feature: 'Ads', free: 'Ad-supported', premium: 'Ad-free' },
    { feature: 'Offline Mode', free: '❌', premium: '✅' },
    { feature: 'Skips', free: 'Limited', premium: 'Unlimited' },
    { feature: 'Exclusive Content', free: '❌', premium: '✅' }
  ]

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-xl border bg-white shadow-md">
      <div className="grid grid-cols-3 border-b bg-zinc-50 p-4 text-center">
        <div className="text-lg font-bold">Features</div>
        <div className="text-lg font-bold">Free</div>
        <div className="text-primary text-lg font-bold">Premium</div>
      </div>

      {features.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}
        >
          <div className="font-medium">{item.feature}</div>
          <div className="text-center text-zinc-600">{item.free}</div>
          <div className="text-primary text-center font-medium">
            {item.premium}
          </div>
        </div>
      ))}
    </div>
  )
}

const PremiumCard = () => {
  const features = [
    {
      title: 'Ad-free Experience',
      description: 'Enjoy music without interruptions'
    },
    {
      title: 'HD Audio Quality',
      description: 'Crystal clear sound up to 320kbps'
    },
    {
      title: 'Offline Listening',
      description: 'Download music to listen anywhere'
    },
    {
      title: 'Unlimited Everything',
      description: 'No limits on playlists, skips, or downloads'
    }
  ]

  return (
    <div className="from-primary/10 to-primary/5 relative rounded-xl bg-gradient-to-br p-1">
      <div className="max-w-2xl rounded-lg bg-white p-8">
        <div className="mb-6 flex items-center gap-3">
          <LuCrown className="text-primary size-7" />
          <h3 className="text-2xl font-bold">Premium</h3>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-5xl font-bold">$5.99</span>
            <span className="ml-2 text-zinc-500">/month</span>
          </div>
          <p className="mt-2 text-zinc-600">Billed monthly, cancel anytime</p>
        </div>

        <Divider className="my-6" />

        <h4 className="mb-4 font-medium">Everything in Free, plus:</h4>

        <div className="mb-8 space-y-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <LuCheck className="text-primary mt-0.5 size-5 flex-shrink-0" />
              <div>
                <span className="font-medium text-zinc-800">
                  {feature.title}
                </span>
                <p className="text-sm text-zinc-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <Button block className="h-12 text-base" size="large" type="primary">
          Coming Soon
        </Button>
      </div>
    </div>
  )
}

const FaqSection = () => {
  const faqItems = [
    {
      question: 'When will Premium be available?',
      answer:
        'Premium is coming soon! We are working hard to bring you the best music experience possible. Stay tuned for updates.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your Premium subscription at any time. There are no cancellation fees or long-term commitments.'
    },
    {
      question: 'Will my playlists transfer if I upgrade?',
      answer:
        'Absolutely! All your existing playlists, liked songs, and settings will remain intact when you upgrade to Premium.'
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and various mobile payment options for your convenience.'
    }
  ]

  return (
    <div className="space-y-6">
      {faqItems.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border border-zinc-200 bg-white p-6"
        >
          <h3 className="mb-3 text-xl font-semibold">{item.question}</h3>
          <p className="text-zinc-600">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
