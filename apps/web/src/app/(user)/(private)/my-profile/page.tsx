'use client'

import { useEffect, useState } from 'react'

import { Button, Drawer, Form, type DrawerProps } from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitter
} from 'react-icons/bi'
import {
  LuCalendar,
  LuCircleUser,
  LuCloudUpload,
  LuGlobe,
  LuKey,
  LuLayoutDashboard,
  LuLock,
  LuMusic,
  LuSquarePen,
  LuStar,
  LuUser
} from 'react-icons/lu'

import { APP_SLUG, capitalize } from '@mizzo/utils'

import USER_AVATAR_PLACEHOLDER from '@/assets/placeholders/user-avatar.webp'
import { ImageWithFallback } from '@/components/common/image-with-fallback'
import { Loader } from '@/components/common/loader'
import { UpdatePasswordForm } from '@/components/forms/update-password'
import { UpdateProfileForm } from '@/components/forms/update-profile'
import { useDrawerWidth } from '@/hooks/custom/use-drawer-width'
import { useOpenClose } from '@/hooks/custom/use-open-close'
import { getFormattedDate } from '@/lib/dayjs'
import { httpUrl, s3GetUrlFromKey } from '@/lib/utils'

const MyProfilePage = () => {
  const router = useRouter()
  const [form] = Form.useForm()

  const { data: session, status } = useSession()
  const { drawerWidth } = useDrawerWidth()

  const [avatar, setAvatar] = useState(
    s3GetUrlFromKey(session?.user?.profile?.avatarKey) ??
      USER_AVATAR_PLACEHOLDER
  )

  const {
    isOpen: isUpdateProfileDrawerOpen,
    open: openUpdateProfileDrawer,
    close: closeUpdateProfileDrawer
  } = useOpenClose()

  const {
    isOpen: isUpdatePasswordModalOpen,
    open: openUpdatePasswordModal,
    close: closeUpdatePasswordModal
  } = useOpenClose()

  useEffect(() => {
    document.title = `My Profile - ${capitalize(APP_SLUG)}`
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      name: session?.user?.name,
      email: session?.user?.email,
      facebook: session?.user?.profile?.facebook,
      instagram: session?.user?.profile?.instagram,
      twitter: session?.user?.profile?.twitter
    })
  }, [form, session])

  const drawerProps: DrawerProps = {
    destroyOnClose: true,
    prefixCls: 'accent-drawer',
    className: 'relative h-full w-full',
    placement: 'right',
    width: drawerWidth
  }

  const userInfoItems = [
    {
      Icon: LuUser,
      label: 'User ID',
      value: session?.user?.id
    },
    {
      Icon: LuCalendar,
      label: 'Member Since',
      value: getFormattedDate(session?.user?.createdAt)
    }
  ]

  const socialMediaItems = [
    {
      Icon: BiLogoFacebookCircle,
      label: 'Facebook',
      value: session?.user?.profile?.facebook,
      url: httpUrl(session?.user?.profile?.facebook || '')
    },
    {
      Icon: BiLogoInstagramAlt,
      label: 'Instagram',
      value: session?.user?.profile?.instagram,
      url: httpUrl(session?.user?.profile?.instagram || '')
    },
    {
      Icon: BiLogoTwitter,
      label: 'Twitter',
      value: session?.user?.profile?.twitter,
      url: httpUrl(session?.user?.profile?.twitter || '')
    }
  ]

  if (status === 'loading') {
    return <Loader loading />
  }

  if (status === 'unauthenticated') {
    router.replace('/auth/login')
    return null
  }

  return (
    <>
      <div className="grid grid-cols-[20rem_1fr] gap-5">
        <div className="from-primary-light to-primary/25 sticky top-4 flex h-fit flex-col gap-4 rounded-lg bg-gradient-to-br p-5">
          <ImageWithFallback
            alt={session?.user?.name || 'User avatar'}
            className="aspect-square size-[17.5rem] overflow-hidden rounded-lg bg-white object-cover"
            draggable={false}
            fallbackSrc={avatar}
            height={280}
            src={avatar}
            width={280}
            onError={() => setAvatar(USER_AVATAR_PLACEHOLDER)}
          />

          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-bold">{session?.user?.name}</h1>

            <p className="text-sm font-medium text-zinc-600">
              {session?.user?.email}
            </p>

            <p className="text-sm text-zinc-600">
              {session?.user?.profile?.bio || 'No bio provided'}
            </p>

            <div className="mt-4 grid w-full gap-3">
              <button
                className="bg-background group flex w-full items-center gap-3 rounded-lg p-4 text-left shadow-sm transition-all hover:bg-white/75 hover:shadow-md"
                onClick={openUpdateProfileDrawer}
              >
                <div className="bg-primary/10 grid size-10 shrink-0 place-items-center rounded-full">
                  <LuSquarePen className="text-primary size-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-medium">Update Profile</p>
                  <p className="text-sm text-zinc-500">
                    Edit your profile information
                  </p>
                </div>
              </button>

              <button
                className="bg-background group flex w-full items-center gap-3 rounded-lg p-4 text-left shadow-sm transition-all hover:bg-white/75 hover:shadow-md"
                onClick={openUpdatePasswordModal}
              >
                <div className="bg-primary/10 grid size-10 shrink-0 place-items-center rounded-full">
                  <LuKey className="text-primary size-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-zinc-500">
                    Update your account password
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-background flex items-center gap-4 rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 grid size-10 shrink-0 place-items-center rounded-full">
                {session?.user?.isPremiumUser ? (
                  <LuStar className="text-primary size-5" />
                ) : (
                  <LuCircleUser className="text-primary size-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-500">Membership Status</p>
                <p className="truncate font-medium">
                  {session?.user?.isPremiumUser
                    ? 'Premium Member'
                    : 'Regular Member'}
                </p>
              </div>
            </div>

            <div className="bg-background flex items-center gap-4 rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-primary/10 grid size-10 shrink-0 place-items-center rounded-full">
                {session?.user?.isPublicProfile ? (
                  <LuGlobe className="text-primary size-5" />
                ) : (
                  <LuLock className="text-primary size-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-500">Profile Visibility</p>
                <p className="truncate font-medium">
                  {session?.user?.isPublicProfile
                    ? 'Public Profile'
                    : 'Private Profile'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {socialMediaItems.map((item, index) => (
              <a
                key={index}
                className="group flex items-center gap-3 rounded-lg bg-black/5 p-4 transition-all hover:bg-black/10"
                href={item.url}
                rel="noreferrer"
                target="_blank"
              >
                <item.Icon className="text-primary text-3xl transition-transform group-hover:scale-110" />

                <div className="overflow-hidden">
                  <p className="text-sm text-zinc-500">{item.label}</p>
                  <p className="truncate text-sm font-medium">
                    {!item.value ? 'Not Connected' : item.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {userInfoItems.map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 grid size-10 shrink-0 place-items-center rounded-full">
                    <item.Icon className="text-primary size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-500">{item.label}</p>
                    <p className="truncate font-medium">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <ArtistSection />
        </div>
      </div>

      <Drawer
        {...drawerProps}
        open={isUpdateProfileDrawerOpen}
        title="Update Profile"
        onClose={closeUpdateProfileDrawer}
      >
        <UpdateProfileForm close={closeUpdateProfileDrawer} />
      </Drawer>

      <Drawer
        {...drawerProps}
        open={isUpdatePasswordModalOpen}
        title="Update Password"
        onClose={closeUpdatePasswordModal}
      >
        <UpdatePasswordForm close={closeUpdatePasswordModal} />
      </Drawer>
    </>
  )
}

export default MyProfilePage

const ArtistSection = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loader loading />
  }

  if (status === 'unauthenticated') {
    return null
  }

  if (session?.user?.isArtist) {
    return (
      <div className="bg-primary/5 space-y-5 rounded-2xl p-8 text-center">
        <h2 className="text-primary text-2xl font-bold">
          Share Your Music with the World
        </h2>

        <p className="mx-auto max-w-lg text-zinc-600">
          As a verified artist, you have access to powerful tools to share your
          music, connect with fans, and grow your audience. Upload new tracks or
          check your performance in the artist dashboard.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            className="flex h-12 w-fit items-center gap-2 px-8"
            href="/studio/dashboard"
            size="large"
            type="primary"
          >
            <LuLayoutDashboard className="size-5" />
            <span>Go to Artist Dashboard</span>
          </Button>

          <Button
            className="flex h-12 w-fit items-center gap-2 px-8"
            href="/studio/upload"
            size="large"
          >
            <LuCloudUpload className="size-5" />
            <span>Upload New Music</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primary/5 space-y-4 rounded-2xl p-8 text-center">
      <h2 className="text-primary text-2xl font-bold">
        Ready to Share Your Music?
      </h2>

      <p className="mx-auto max-w-lg text-zinc-600">
        Join our community of artists and start sharing your musical journey
        with the world. Get access to powerful tools, analytics, and connect
        with your fans directly.
      </p>

      <Button
        className="mx-auto flex h-12 w-fit items-center gap-2 px-8"
        href="/artist-application"
        size="large"
        type="primary"
      >
        <LuMusic className="size-5" />
        <span>
          {session?.user?.isArtistApplicationSubmitted
            ? 'Check Application Status'
            : 'Start Your Artist Journey'}
        </span>
      </Button>

      {session?.user?.isArtistApplicationSubmitted && (
        <p className="mt-2 text-sm text-zinc-500">
          We&apos;re reviewing your application. We&apos;ll notify you once
          it&apos;s processed.
        </p>
      )}
    </div>
  )
}
