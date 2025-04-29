import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { LuPlay, LuSparkles } from 'react-icons/lu'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="from-primary/10 absolute inset-0 bg-gradient-to-b to-transparent" />

      <div className="container relative mx-auto px-4">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="border-primary/25 bg-background mb-2 flex cursor-default items-center rounded-full border p-0.5 text-sm font-medium">
            <div className="grid size-7 place-items-center rounded-full bg-white">
              <LuSparkles className="text-primary size-5" />
            </div>

            <p className="px-2">Create Magic Playlists</p>
          </div>
          <h1 className="from-primary to-primary/70 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Where Music Flows
          </h1>

          <p className="mb-10 max-w-2xl text-xl text-zinc-700">
            Discover, stream, and share unlimited music. Connect with artists
            and fans in a community built for music lovers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/home">
              <Button
                className="h-12 rounded-full px-8 text-lg"
                size="large"
                type="primary"
              >
                Start Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                className="h-12 rounded-full px-8 text-lg"
                size="large"
                type="default"
              >
                Know More
              </Button>
            </Link>
          </div>
        </div>

        <div className="group relative mx-auto max-w-5xl overflow-hidden rounded-full">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-primary/25 col-span-1 row-span-2 overflow-hidden rounded-lg shadow-sm">
              <div className="relative aspect-[3/4] h-full w-full">
                <Image
                  fill
                  alt="Guitarist"
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1545538331-78f76ca06830?q=80&w=1170"
                />
              </div>
            </div>

            <div className="bg-primary/25 col-span-1 overflow-hidden rounded-lg shadow-sm">
              <div className="relative aspect-[4/3] h-full w-full">
                <Image
                  fill
                  alt="Music Concert"
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1170"
                />
              </div>
            </div>

            <div className="bg-primary/25 col-span-1 overflow-hidden rounded-lg shadow-sm">
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  alt="Headphones"
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1665152454292-f3c9384e082c?q=80&w=1170"
                />
              </div>
            </div>

            <div className="bg-primary/25 col-span-2 overflow-hidden rounded-lg shadow-sm">
              <div className="relative aspect-[16/9] h-full w-full">
                <Image
                  fill
                  alt="Music Instruments"
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1287"
                />
              </div>
            </div>
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
