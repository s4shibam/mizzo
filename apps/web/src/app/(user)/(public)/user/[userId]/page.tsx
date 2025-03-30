'use client'

import { useEffect } from 'react'

import { Button, Tooltip } from 'antd'
import { useParams } from 'next/navigation'
import { LuFacebook, LuInstagram, LuPlus, LuTwitter } from 'react-icons/lu'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ErrorInfo } from '@/components/common/error-info'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { PublicPlaylistsOfUser } from '@/components/common/public-playlists-of-user'
import { UserMenu } from '@/components/menus/user'
import { ComingSoonModal } from '@/components/modals/coming-soon'
import { useSearchUserByUserId } from '@/hooks/api/search'
import { httpUrl, s3GetUrlFromKey } from '@/lib/utils'

const UserByUserIdPage = () => {
  const params = useParams() as { userId: string }

  const {
    data: user,
    isLoading,
    error
  } = useSearchUserByUserId({ search: params?.userId, as: 'user' })

  useEffect(() => {
    document.title = `Profile - ${user?.data?.name ?? 'Loading...'}`
  }, [user?.data?.name])

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
      url: user?.data?.profile?.facebook
    },
    {
      platform: 'instagram',
      icon: LuInstagram,
      url: user?.data?.profile?.instagram
    },
    {
      platform: 'twitter',
      icon: LuTwitter,
      url: user?.data?.profile?.twitter
    }
  ]

  return (
    <div className="grid grid-cols-[20rem_1fr] gap-5">
      <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
        <ImageWithFallback
          alt="avatar"
          className="aspect-square size-[17.5rem] overflow-hidden rounded-xl bg-white object-cover"
          draggable={false}
          fallbackSrc={USER_AVATAR_PLACEHOLDER}
          height={280}
          src={s3GetUrlFromKey(user?.data?.profile?.avatarKey)}
          width={280}
        />

        <div className="flex flex-col items-center gap-2 text-center">
          <Tooltip title={user?.data?.name}>
            <h1 className="line-clamp-1 text-3xl font-bold">
              {user?.data?.name}
            </h1>
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
            <ComingSoonModal featureName="Follow User">
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
            <UserMenu as="user" user={user?.data} />
          </div>
        </div>
      </div>

      <PublicPlaylistsOfUser user={user?.data} />
    </div>
  )
}

export default UserByUserIdPage
