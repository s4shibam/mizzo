'use client'

import { Button } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { IconType } from 'react-icons/lib'
import {
  LuHeart,
  LuHouse,
  LuLibrary,
  LuListPlus,
  LuSearch,
  LuSparkles
} from 'react-icons/lu'

import { IconItem } from '@/components/common/icon-button'
import { LeftPanelMenu } from '@/components/menus/left-panel'
import { NavMenu } from '@/components/menus/nav'
import { CreatePlaylistModal } from '@/components/modals/create-playlist'
import { PremiumSubscriptionModal } from '@/components/modals/premium-subscription'
import { useOpenClose } from '@/hooks/custom/use-open-close'

const UserBaseLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession()

  return (
    <div className="relative size-full h-screen overflow-hidden pl-64">
      <NavMenu />

      <LeftPanelMenu>
        <UserLayoutBaseMenu />

        {status === 'authenticated' && <UserLayoutAuthenticatedMenu />}

        {status === 'unauthenticated' && <UserLayoutUnauthenticatedMenu />}
      </LeftPanelMenu>

      <div className="mt-16 flex h-[calc(100vh-4rem)] w-full flex-col overflow-y-scroll">
        <div className="mx-auto size-full min-h-fit max-w-screen-2xl p-4 pb-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default UserBaseLayout

type MenuItemProps = {
  key: string
  label: React.ReactNode
  Icon: IconType
  link?: string
  onClick?: () => void
}

const UserLayoutBaseMenu = () => {
  const pathname = usePathname()

  const menuItems: MenuItemProps[] = [
    {
      key: '/home',
      link: '/home',
      label: 'Home',
      Icon: LuHouse
    },
    {
      key: '/search',
      link: '/search',
      label: 'Search',
      Icon: LuSearch
    }
  ]

  return (
    <>
      {menuItems.map((item) => (
        <IconItem
          key={item?.key}
          isActive={pathname?.startsWith(item?.key)}
          item={item}
        />
      ))}
    </>
  )
}

const UserLayoutAuthenticatedMenu = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const {
    isOpen: isCreatePlaylistModalOpen,
    open: openCreatePlaylistModal,
    close: closeCreatePlaylistModal
  } = useOpenClose()
  const {
    isOpen: isSubscribeModalOpen,
    open: openSubscribeModal,
    close: closeSubscribeModal
  } = useOpenClose()

  const menuItems: MenuItemProps[] = [
    {
      key: '/library',
      link: '/library',
      label: 'Library',
      Icon: LuLibrary
    },
    {
      key: '/create-playlist',
      label: 'Create Playlist',
      Icon: LuListPlus,
      onClick: openCreatePlaylistModal
    },
    {
      key: '/liked-songs',
      label: 'Liked Songs',
      Icon: LuHeart,
      link: '/liked-songs'
    },
    {
      key: '/magic-playlist',
      label: 'Magic Playlist',
      Icon: LuSparkles,
      ...(session?.user?.isPremiumUser
        ? { link: '/magic-playlist' }
        : { onClick: openSubscribeModal })
    }
  ]

  return (
    <>
      {menuItems.map((item) => (
        <IconItem
          key={item?.key}
          isActive={pathname?.startsWith(item?.key)}
          item={item}
        />
      ))}

      <CreatePlaylistModal
        close={closeCreatePlaylistModal}
        isOpen={isCreatePlaylistModalOpen}
      />

      <PremiumSubscriptionModal
        close={closeSubscribeModal}
        featureName="Magic Playlist"
        isOpen={isSubscribeModalOpen}
      />
    </>
  )
}

const UserLayoutUnauthenticatedMenu = () => {
  return (
    <>
      <div className="to-primary-light from-primary/25 mt-6 flex flex-col rounded-lg border bg-gradient-to-br p-2.5">
        <span className="text-lg font-medium">Create your first playlist</span>
        <span className="pb-4 text-sm/4">
          It&apos;s so simple, we&apos;ll help you.
        </span>

        <Link href="/auth/login">
          <Button block size="large" type="primary">
            Create Playlist
          </Button>
        </Link>
      </div>
    </>
  )
}
