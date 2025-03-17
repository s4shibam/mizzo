import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import {
  LuEllipsisVertical,
  LuOctagonAlert,
  LuThumbsDown,
  LuThumbsUp
} from 'react-icons/lu'

import { cn, WEB_URL } from '@mizzo/utils'

import { CopyLinkButton } from '@/components/common/copy-link-button'
import { ComingSoonModal } from '@/components/modals/coming-soon'
import type { User } from '@/types/user'

type UserMenuProps = {
  as?: 'artist' | 'user'
  user: User | undefined
  isFollowing?: boolean
  className?: string
  onMenuClick?: () => void
  onMenuClose?: () => void
}

export const UserMenu = ({
  as,
  user,
  isFollowing = false,
  onMenuClick = () => {},
  onMenuClose = () => {},
  className
}: UserMenuProps) => {
  const userUrl = `${WEB_URL}/${as}/${user?.id}`

  const getUserMenu = () => {
    const items: MenuProps['items'] = []

    if (as === 'artist') {
      items.push({
        key: 'follow-artist',
        label: (
          <ComingSoonModal featureName="Follow Artist">
            {(openModal) => (
              <div className="mz-dropdown-menu-item" onClick={openModal}>
                {isFollowing ? (
                  <LuThumbsDown className="text-primary size-full" />
                ) : (
                  <LuThumbsUp className="text-primary size-full" />
                )}
                <span>{isFollowing ? 'Unfollow' : 'Follow'} Artist</span>
              </div>
            )}
          </ComingSoonModal>
        )
      })
    }

    items.push({
      key: 'report',
      label: (
        <ComingSoonModal featureName="Report">
          {(openModal) => (
            <div className="mz-dropdown-menu-item" onClick={openModal}>
              <LuOctagonAlert className="text-primary size-full" />
              <span>Report</span>
            </div>
          )}
        </ComingSoonModal>
      )
    })

    items.push({
      key: 'copy-link',
      label: <CopyLinkButton className="mz-dropdown-menu-item" link={userUrl} />
    })

    return items
  }

  const items = getUserMenu()

  return (
    <Dropdown
      menu={{ items, onClick: onMenuClose }}
      prefixCls="artist-menu"
      trigger={['click']}
      onOpenChange={(visible) => {
        if (visible) {
          onMenuClick()
        } else {
          onMenuClose()
        }
      }}
    >
      <button
        className={cn(
          'bg-primary/25 grid size-7 place-items-center rounded-full focus:outline-none',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <LuEllipsisVertical className="size-4" />
      </button>
    </Dropdown>
  )
}
