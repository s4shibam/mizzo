import { Button } from 'antd'
import Link from 'next/link'
import { LuCheck, LuX } from 'react-icons/lu'

export const PricingSection = () => {
  const plans = [
    {
      title: 'Free',
      price: '$0.00',
      description: 'Perfect for casual listeners',
      ctaText: 'Get Started',
      ctaLink: '/auth/signup',
      comingSoon: false,
      features: [
        { text: 'Ad-supported listening', included: true },
        { text: 'Create up to 5 playlists', included: true },
        { text: 'Basic audio quality', included: true },
        { text: 'Limited skips', included: true },
        { text: 'Ad-free experience', included: false },
        { text: 'Offline listening', included: false },
        { text: 'High-definition audio', included: false }
      ]
    },
    {
      title: 'Premium',
      price: '$5.99',
      description: 'For dedicated music enthusiasts',
      ctaText: 'Coming Soon',
      ctaLink: '/premium',
      comingSoon: true,
      features: [
        { text: 'Ad-supported listening', included: true },
        { text: 'Unlimited playlists', included: true },
        { text: 'High-definition audio', included: true },
        { text: 'Unlimited skips', included: true },
        { text: 'Ad-free experience', included: true },
        { text: 'Offline listening', included: true },
        { text: 'Exclusive content access', included: true }
      ]
    }
  ]

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600">
            Select the perfect plan that fits your music needs and budget
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <PricingPlan key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

type PlanFeature = {
  text: string
  included: boolean
}

type PricingPlanProps = {
  title: string
  price: string
  description: string
  features: PlanFeature[]
  ctaText: string
  ctaLink: string
  comingSoon?: boolean
}

// Custom ribbon component
const ComingSoonRibbon = () => {
  return (
    <div className="absolute -right-1 -top-1 overflow-hidden rounded-bl-xl">
      <div className="from-primary to-primary/80 flex h-8 origin-top-right rotate-0 transform items-center justify-center bg-gradient-to-r px-4 py-1 text-xs font-bold text-white shadow-md">
        Coming Soon
      </div>
    </div>
  )
}

const PricingPlan = ({
  title,
  price,
  description,
  features,
  ctaText,
  ctaLink,
  comingSoon = false
}: PricingPlanProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
        comingSoon ? 'border-primary' : 'border-zinc-100'
      }`}
    >
      {comingSoon && <ComingSoonRibbon />}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-zinc-500">/month</span>}
      </div>
      <p className="mb-6 text-zinc-600">{description}</p>

      <div className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            {feature.included ? (
              <LuCheck className="text-primary size-5 flex-shrink-0" />
            ) : (
              <LuX className="size-5 flex-shrink-0 text-zinc-400" />
            )}
            <span
              className={feature.included ? 'text-zinc-700' : 'text-zinc-400'}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Link className="block" href={ctaLink}>
        <Button
          block
          className="h-11"
          size="large"
          type={comingSoon ? 'primary' : 'default'}
        >
          {ctaText}
        </Button>
      </Link>
    </div>
  )
}
