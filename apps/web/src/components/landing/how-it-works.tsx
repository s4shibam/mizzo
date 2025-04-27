import { Button } from 'antd'
import Link from 'next/link'
import { FiHeadphones, FiMusic, FiPlus, FiShare2 } from 'react-icons/fi'

export const HowItWorks = () => {
  const steps = [
    {
      icon: <FiMusic className="size-6" />,
      title: 'Sign Up for Free',
      description:
        'Create your account in seconds and get instant access to millions of songs and exclusive content.'
    },
    {
      icon: <FiHeadphones className="size-6" />,
      title: 'Discover & Listen',
      description:
        'Browse curated playlists, discover new artists, and enjoy personalized recommendations.'
    },
    {
      icon: <FiPlus className="size-6" />,
      title: 'Create Playlists',
      description:
        'Build your own music collections and organize your favorite tracks just the way you like.'
    },
    {
      icon: <FiShare2 className="size-6" />,
      title: 'Share & Connect',
      description:
        'Share your music with friends and follow your favorite artists to stay updated with their releases.'
    }
  ]

  return (
    <section className="bg-zinc-50 py-20" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-600">
            Getting started with Mizzo is easy. Follow these simple steps to
            unlock your music experience.
          </p>
        </div>

        <div className="mx-auto mb-16 grid w-full max-w-5xl gap-12 md:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/home">
            <Button
              className="h-12 rounded-full px-8 text-lg"
              size="large"
              type="primary"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

type StepProps = {
  icon: React.ReactNode
  title: string
  description: string
}

const Step = ({ icon, title, description }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
      <div className="from-primary to-primary/70 mb-6 mr-6 grid size-16 flex-shrink-0 place-items-center rounded-full bg-gradient-to-r text-white md:mb-0">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-zinc-600">{description}</p>
      </div>
    </div>
  )
}
