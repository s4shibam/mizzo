'use client'

import React from 'react'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { IconType } from 'react-icons/lib'
import {
  LuFileText,
  LuLayoutDashboard,
  LuListMusic,
  LuMusic2,
  LuOctagonAlert,
  LuUser,
  LuUserCog
} from 'react-icons/lu'

import { IconItem } from '@/components/common/icon-button'
import { Loader } from '@/components/common/loader'
import { LeftPanelMenu } from '@/components/menus/left-panel'
import { NavMenu } from '@/components/menus/nav'
import { ComingSoonModal } from '@/components/modals/coming-soon'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Loader
        fullScreen
        row={false}
        text="Let us check if you are an admin or not"
      />
    )
  }

  if (!session?.user?.isAdmin) {
    toast.error('You are not an admin')
    router.replace('/')
    return null
  }

  return (
    <div className="relative size-full h-screen overflow-hidden pl-64">
      <NavMenu />

      <AdminLayoutLeftSideMenu />

      <div className="mt-16 flex h-[calc(100vh-4rem)] w-full flex-col overflow-y-scroll">
        <div className="mx-auto size-full min-h-fit max-w-screen-2xl p-4 pb-24">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout

type MenuItemProps = {
  key: string
  label: string
  Icon: IconType
  link?: string
  onClick?: () => void
  soon?: boolean
}

const AdminLayoutLeftSideMenu = () => {
  const pathname = usePathname()

  const menuItems: MenuItemProps[] = [
    {
      key: '/admin/dashboard',
      link: '/admin/dashboard',
      label: 'Dashboard',
      Icon: LuLayoutDashboard
    },
    {
      key: '/admin/users',
      link: '/admin/users',
      label: 'Users',
      Icon: LuUser
    },
    {
      key: '/admin/tracks',
      link: '/admin/tracks',
      label: 'Tracks',
      Icon: LuMusic2
    },
    {
      key: '/admin/playlists',
      link: '/admin/playlists',
      label: 'Playlists',
      Icon: LuListMusic
    },
    {
      key: '/admin/admins',
      link: '/admin/admins',
      label: 'Admins',
      Icon: LuUserCog
    },
    {
      key: '/admin/artist-applications',
      link: '/admin/artist-applications',
      label: 'Artist Applications',
      Icon: LuFileText
    },
    {
      key: '/admin/reports',
      link: '/admin/reports',
      label: 'Reports',
      Icon: LuOctagonAlert,
      soon: true
    }
  ]

  return (
    <LeftPanelMenu>
      {menuItems.map((item) => {
        if (item?.soon) {
          return (
            <ComingSoonModal key={item?.key} featureName={item.label || ''}>
              {(openModal) => (
                <IconItem
                  key={item?.key}
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
