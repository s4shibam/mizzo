'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { IconType } from 'react-icons/lib'
import {
  LuCloudUpload,
  LuHeartHandshake,
  LuLayoutDashboard,
  LuMusic2,
  LuTrendingUp
} from 'react-icons/lu'

import { IconItem } from '@/components/common/icon-button'
import { Loader } from '@/components/common/loader'
import { LeftPanelMenu } from '@/components/menus/left-panel'
import { NavMenu } from '@/components/menus/nav'
import { ComingSoonModal } from '@/components/modals/coming-soon'

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loader fullScreen />
  }

  if (!session?.user?.isArtist) {
    toast.error('You are not an artist')
    router.replace('/')
    return null
  }

  return (
    <div className="relative size-full h-screen overflow-hidden pl-64">
      <NavMenu />

      <ArtistLayoutLeftSideMenu />

      <div className="mt-16 flex h-[calc(100vh-4rem)] w-full flex-col overflow-y-scroll">
        <div className="relative mx-auto size-full min-h-fit max-w-screen-2xl p-4 pb-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ArtistLayout

type MenuItemProps = {
  key: string
  label: string
  Icon: IconType
  link?: string
  onClick?: () => void
  soon?: boolean
}

const ArtistLayoutLeftSideMenu = () => {
  const pathname = usePathname()

  const menuItems: MenuItemProps[] = [
    {
      key: '/studio/dashboard',
      link: '/studio/dashboard',
      label: 'Dashboard',
      Icon: LuLayoutDashboard
    },
    {
      key: '/studio/upload',
      link: '/studio/upload',
      label: 'Upload New',
      Icon: LuCloudUpload
    },
    {
      key: '/studio/content',
      link: '/studio/content',
      label: 'Content',
      Icon: LuMusic2
    },
    {
      key: '/studio/collabs',
      link: '/studio/collabs',
      label: 'Collaborations',
      Icon: LuHeartHandshake
    },
    {
      key: '/studio/promotion',
      label: 'Promotion',
      Icon: LuTrendingUp,
      soon: true
    }
  ]

  return (
    <LeftPanelMenu>
      {menuItems.map((item) => {
        if (item.soon) {
          return (
            <ComingSoonModal key={item?.key} featureName={item.label || ''}>
              {(openModal) => (
                <IconItem
                  key={item?.key}
                  className="w-full"
                  isActive={pathname?.startsWith(item?.key)}
                  item={{ ...item, onClick: openModal }}
                />
              )}
            </ComingSoonModal>
          )
        } else {
          return (
            <IconItem
              key={item?.key}
              isActive={pathname?.startsWith(item?.key)}
              item={item}
            />
          )
        }
      })}
    </LeftPanelMenu>
  )
}
