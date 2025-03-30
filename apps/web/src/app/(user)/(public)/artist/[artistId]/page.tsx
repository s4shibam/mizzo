'use client'

import { useEffect } from 'react'

import { Button, Tooltip } from 'antd'
import { useParams } from 'next/navigation'
import { LuFacebook, LuInstagram, LuPlus, LuTwitter } from 'react-icons/lu'

import ARTIST_AVATAR_PLACEHOLDER from '@/assets/placeholders/artist-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { MoreTracksOfTheArtist } from '@/components/common/more-tracks-of-the-artist'
import { UserMenu } from '@/components/menus/user'
import { ComingSoonModal } from '@/components/modals/coming-soon'
import { useSearchUserByUserId } from '@/hooks/api/search'
import { httpUrl, s3GetUrlFromKey } from '@/lib/utils'

const ArtistByArtistIdPage = () => {
  const params = useParams() as { artistId: string }
  const {
    data: artist,
    isLoading,
    error
  } = useSearchUserByUserId({ search: params?.artistId, as: 'artist' })

  useEffect(() => {
    document.title = `Artist -  ${artist?.data?.name}`
  }, [artist?.data?.name])

  if (isLoading) {
    return <Loader loading />
  }

  if (error) {
    return <ErrorInfo error={error} />
  }

  const socialLinks = [
    {
      platform: 'facebook',
      icon: LuFacebook,
      url: artist?.data?.profile?.facebook
    },
    {
      platform: 'instagram',
      icon: LuInstagram,
      url: artist?.data?.profile?.instagram
    },
    {
      platform: 'twitter',
      icon: LuTwitter,
      url: artist?.data?.profile?.twitter
    }
  ]

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-5">
      <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
        <ImageWithFallback
          alt="avatar"
          className="aspect-square size-[17.5rem] overflow-hidden rounded-xl bg-white object-cover"
          draggable={false}
          fallbackSrc={ARTIST_AVATAR_PLACEHOLDER}
          height={280}
          src={s3GetUrlFromKey(artist?.data?.profile?.avatarKey)}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <Tooltip title={artist?.data?.name}>
            <h1 className="line-clamp-1 text-3xl font-bold">
              {artist?.data?.name}
            </h1>
          </Tooltip>

          <Tooltip title={artist?.data?.profile?.bio || 'No bio provided'}>
            <p className="line-clamp-2 text-sm text-zinc-500">
              {artist?.data?.profile?.bio || 'No bio provided'}
            </p>
          </Tooltip>

          <div className="flex items-center gap-3">
            {socialLinks
              .filter((social) => social.url)
              .map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.platform}
                    className="hover:bg-background rounded-md p-1"
                    href={httpUrl(social.url!)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <ComingSoonModal featureName="Follow Artist">
              {(openModal) => (
                <Button
                  className="w-32"
                  icon={<LuPlus />}
                  size="large"
                  type="primary"
                  onClick={openModal}
                >
                  Follow
                </Button>
              )}
            </ComingSoonModal>

            <UserMenu as="artist" user={artist?.data} />
          </div>
        </div>
      </div>

      <MoreTracksOfTheArtist primaryArtist={artist?.data} />
    </div>
  )
}

export default ArtistByArtistIdPage
