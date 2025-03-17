import { Button, Drawer } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePlayerContext } from 'providers/player-provider'
import { toast } from 'react-hot-toast'
import {
  LuCircleUser,
  LuLogOut,
  LuMicVocal,
  LuShieldCheck,
  LuStar,
  LuUserRound
} from 'react-icons/lu'

import { IconItem } from '@/components/common/icon-button'
import { useOpenClose } from '@/hooks/custom/use-open-close'

export const ProfileMenu = () => {
  const pathname = usePathname()
  const { data: session } = useSession()

  const { setActiveTrack, setActivePlaylist } = usePlayerContext()

  const { isOpen, close, open } = useOpenClose()

  const getProfileMenus = () => {
    const items = [
      {
        key: '/my-profile',
        label: 'My Profile',
        Icon: LuUserRound,
        link: '/my-profile'
      },
      {
        key: '/premium',
        label: 'Get Premium',
        Icon: LuStar,
        link: '/premium'
      }
    ]

    if (session?.user?.isArtist) {
      items.push({
        key: '/studio',
        label: 'Artist Studio',
        Icon: LuMicVocal,
        link: '/studio/dashboard'
      })
    }

    if (session?.user?.isAdmin) {
      items.push({
        key: '/admin',
        label: 'Admin Panel',
        Icon: LuShieldCheck,
        link: '/admin/dashboard'
      })
    }

    return items
  }

  const menuItems = getProfileMenus()

  const handleLogOut = async () => {
    setActiveTrack(undefined)
    setActivePlaylist(undefined)
    
    try {
      await signOut({ callbackUrl: '/' })
      toast.success('Logged out successfully')
      close()
    } catch (err) {
      console.error('Failed to log out', err)
      toast.error('Unknown error occurred')
    }
  }

  return (
    <>
      <div
        className="bg-secondary grid size-9 place-items-center rounded-full"
        onClick={open}
      >
        <LuCircleUser className="mz-text-transition size-7 cursor-pointer select-none stroke-[1.5] text-white" />
      </div>

      <Drawer
        maskClosable
        open={isOpen}
        placement="right"
        prefixCls="accent-drawer"
        title="Menu"
        width={280}
        onClose={close}
      >
        <div className="flex h-full flex-col gap-1">
          {menuItems.map((item) => (
            <IconItem
              key={item.key}
              isActive={pathname?.startsWith(item?.key)}
              item={item}
              onClick={close}
            />
          ))}

          <Button
            className="mt-auto"
            icon={<LuLogOut />}
            size="large"
            type="primary"
            onClick={handleLogOut}
          >
            Log Out
          </Button>

          <Link className="mt-2 text-center text-xs text-zinc-500" href="/t&c">
            Terms of Service
          </Link>
        </div>
      </Drawer>
    </>
  )
}

export default ProfileMenu
