import { FiBarChart2, FiHeadphones, FiLink, FiUpload } from 'react-icons/fi'

export const FeaturesSection = () => {
  const features = [
    {
      icon: <FiHeadphones className="size-6" />,
      title: 'Seamless Streaming',
      description:
        'Enjoy high-quality music streaming with zero interruptions. Listen across all your devices with smart sync.'
    },
    {
      icon: <FiUpload className="size-6" />,
      title: 'Artist Platform',
      description:
        'Upload your music with a simple verification process. Gain visibility and connect directly with your audience.'
    },
    {
      icon: <FiBarChart2 className="size-6" />,
      title: 'Smart Discovery',
      description:
        "Find new music you'll love with our intelligent recommendation engine based on your listening habits."
    },
    {
      icon: <FiLink className="size-6" />,
      title: 'Social Integration',
      description:
        'Share playlists, follow artists, and connect with friends who share your musical taste.'
    }
  ]

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why Choose Mizzo
          </h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-600">
            Explore the features that make Mizzo the ultimate platform for music
            lovers and artists
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="hover:border-primary/20 flex flex-col items-start gap-4 rounded-lg border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="bg-primary/10 text-primary grid size-12 place-items-center rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </div>
  )
}
