import Image from 'next/image'
import { FiStar } from 'react-icons/fi'

type TestimonialProps = {
  name: string
  role: string
  quote: string
  avatar: string
  rating: number
}

const Testimonial = ({
  name,
  role,
  quote,
  avatar,
  rating
}: TestimonialProps) => {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-6 flex">
        {Array.from({ length: rating }).map((_, i) => (
          <FiStar key={i} className="size-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="mb-6 italic text-zinc-600">&ldquo;{quote}&rdquo;</p>

      <div className="mt-auto flex items-center gap-4">
        <div className="relative size-12 overflow-hidden rounded-full">
          <Image fill alt={name} className="object-cover" src={avatar} />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-zinc-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Taylor Swift',
      role: 'Singer & Songwriter',
      quote:
        'Mizzo has transformed my connection with fans. The platform makes it easy to share my music and engage with my audience in meaningful ways.',
      avatar:
        'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=1287',
      rating: 5
    },
    {
      name: 'Shreya Ghoshal',
      role: 'Playback Singer',
      quote:
        'Mizzo helped me bring Indian music to a global audience. The platform respects cultural diversity and provides excellent tools for artists around the world.',
      avatar:
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170',

      rating: 5
    },
    {
      name: 'Alan Walker',
      role: 'DJ & Music Producer',
      quote:
        "After joining Mizzo, my listener engagement grew exponentially. The platform's discovery algorithms actually help fans find new music in authentic ways.",
      avatar:
        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1287',
      rating: 5
    }
  ]

  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Artists Say
          </h2>
          <p className="mx-auto max-w-xl text-lg text-zinc-600">
            Join thousands of musicians who are building their careers and
            connecting with fans on Mizzo
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mx-auto mb-4 max-w-2xl text-zinc-600">
            Join over 10,000+ artists who have found success on our platform
          </p>

          <div className="mx-auto flex max-w-lg justify-center gap-6">
            <div className="flex flex-col items-center">
              <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                10K+
              </span>
              <span className="text-sm text-zinc-500">Artists</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                5M+
              </span>
              <span className="text-sm text-zinc-500">Listeners</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                50M+
              </span>
              <span className="text-sm text-zinc-500">Streams</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
