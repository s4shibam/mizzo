import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { LuPlay, LuSparkles } from 'react-icons/lu'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-primary/20 via-primary/10 absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="border-primary/20 mb-4 flex cursor-default items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs sm:text-sm">
            <LuSparkles className="text-primary size-4" />

            <p>Create Magic Playlists</p>
          </div>
          <h1 className="from-primary to-primary/75 mb-6 bg-gradient-to-br bg-clip-text text-5xl font-bold text-transparent drop-shadow-xl md:text-6xl lg:text-7xl">
            Where Music Flows
          </h1>

          <p className="mb-10 max-w-2xl text-lg text-zinc-700 md:text-xl">
            Discover, stream, and share unlimited music. Connect with artists
            and fans in a community built for music lovers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/home">
              <Button
                className="h-11 rounded-full px-8 text-base md:h-12 md:text-lg"
                size="large"
                type="primary"
              >
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                className="h-11 rounded-full px-8 text-base md:h-12 md:text-lg"
                size="large"
                type="default"
              >
                Know More
              </Button>
            </Link>
          </div>
        </div>

        <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-full">
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <Image
              alt="Guitarist"
              className="bg-primary/25 col-span-1 row-span-2 h-full w-full rounded-lg object-cover"
              height={600}
              src="https://images.unsplash.com/photo-1545538331-78f76ca06830"
              width={800}
            />

            <Image
              alt="Music Concert"
              className="bg-primary/25 col-span-1 aspect-[4/3] h-full w-full rounded-lg object-cover"
              height={800}
              src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b"
              width={600}
            />

            <Image
              alt="Headphones"
              className="bg-primary/25 col-span-1 aspect-square h-full w-full rounded-lg object-cover"
              height={800}
              src="https://images.unsplash.com/photo-1665152454292-f3c9384e082c"
              width={800}
            />

            <Image
              alt="Music Instruments"
              className="bg-primary/25 col-span-2 aspect-[16/9] h-full w-full rounded-lg object-cover"
              height={900}
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1287"
              width={1600}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link
              className="flex aspect-square h-auto w-1/5 items-center justify-center rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              href="/home"
            >
              <LuPlay className="text-primary fill-primary size-1/2 drop-shadow-lg" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
