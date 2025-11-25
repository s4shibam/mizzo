'use client'

import { useEffect, type ReactNode } from 'react'

import { Button, Segmented } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { LuPlus } from 'react-icons/lu'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { CreatePlaylistModal } from '@/components/modals/create-playlist'
import { useOpenClose } from '@/hooks/custom/use-open-close'

const LibraryLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()?.split('/')?.pop()
  const router = useRouter()
  const { isOpen, open, close } = useOpenClose()

  useEffect(() => {
    document.title = `Library - ${APP_SLUG_CAP}`
  }, [])

  const handleChange = (value: string | number) => {
    router.push(`/library/${value}`)
  }

  return (
    <>
      <div className="sticky top-4 z-50 mb-4 flex items-center justify-between bg-white">
        <Segmented
          className="p-1 [&>.ant-segmented-group]:gap-1 [&_.ant-segmented-item-selected]:shadow-none"
          options={[
            { label: 'My Playlists', value: 'my-playlists' },
            { label: 'Liked Playlists', value: 'liked-playlists' }
          ]}
          size="large"
          value={pathname}
          onChange={handleChange}
        />

        <Button icon={<LuPlus />} size="large" type="primary" onClick={open}>
          Create Playlist
        </Button>
      </div>

      <CreatePlaylistModal close={close} isOpen={isOpen} />

      {children}
    </>
  )
}

export default LibraryLayout
