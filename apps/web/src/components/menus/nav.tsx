import { useEffect, useRef, useState } from 'react'

import { Breadcrumb, Button, Input, Skeleton, type InputRef } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LuMic, LuSearch, LuX } from 'react-icons/lu'

import { Notifications } from '@/components/common/notifications'
import { ProfileMenu } from '@/components/menus/profile'
import { ComingSoonModal } from '@/components/modals/coming-soon'
import { useQueryParams } from '@/hooks/custom/use-query-params'

export const NavMenu = () => {
  const { status } = useSession()
  const pathname = usePathname()
  const isSearchPath = pathname === '/search'

  if (status === 'loading') {
    return (
      <div className="bg-primary-light fixed inset-x-0 top-0 z-10 ml-4 flex h-16 items-center justify-end gap-4 border-b p-4 pl-64">
        <Skeleton.Avatar active size="large" />
      </div>
    )
  }

  return (
    <div className="bg-primary-light fixed inset-x-0 top-0 z-10 ml-4 grid h-16 grid-cols-4 place-items-center items-center justify-between gap-4 border-b px-4 pl-64">
      <NavBreadcrumb />

      <div className="col-span-2 grid size-full place-items-center">
        {isSearchPath && <SearchInput />}
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <Notifications />

        {status === 'authenticated' && <ProfileMenu />}

        {status === 'unauthenticated' && (
          <>
            <Link href="/auth/signup">
              <Button className="w-24" size="large">
                Sign Up
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button className="w-24" size="large" type="primary">
                Log In
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

const SearchInput = () => {
  const router = useRouter()
  const { qParams } = useQueryParams()

  const searchQuery = qParams.q || ''

  const inputRef = useRef<InputRef>(null)

  const [search, setSearch] = useState(searchQuery)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  useEffect(() => {
    setSearch(qParams.q || '')
  }, [qParams.q])

  useEffect(() => {
    if (search.length === 0) {
      return
    }

    const delayDebounceFn = setTimeout(() => {
      router.push(`/search?q=${search}`)
    }, 500)

    return () => clearTimeout(delayDebounceFn)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="mx-auto flex w-full items-center gap-2">
      <Input
        ref={inputRef}
        className="caret-primary h-10 w-full rounded-lg bg-transparent text-base tracking-wide [&>input]:ml-1"
        placeholder="What do you want to play?"
        prefix={<LuSearch />}
        size="large"
        suffix={
          search.length !== 0 && (
            <LuX
              className="cursor-pointer text-xl"
              onClick={() => {
                setSearch('')
                router.push('/search')
              }}
            />
          )
        }
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            inputRef?.current?.blur()
          }
        }}
      />

      <ComingSoonModal featureName="Voice Search">
        {(openModal) => (
          <button
            className="hover:bg-primary-light grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-solid border-zinc-300 bg-white transition-colors"
            onClick={openModal}
          >
            <LuMic className="size-5" />
          </button>
        )}
      </ComingSoonModal>
    </div>
  )
}

const NavBreadcrumb = () => {
  const items: ItemType[] = []
  const pathname = usePathname()

  const artistLabBreadcrumbRoutes: Record<string, string> = {
    '/studio/dashboard': 'Dashboard',
    '/studio/upload': 'Upload New',
    '/studio/content': 'Content',
    '/studio/collabs': 'Collaborations',
    '/studio/promotion': 'Promotion'
  }

  const adminBreadcrumbRoutes: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/users': 'Users',
    '/admin/tracks': 'Tracks',
    '/admin/playlists': 'Playlists',
    '/admin/admins': 'Admins',
    '/admin/artist-applications': 'Artist Applications',
    '/admin/reports': 'Reports'
  }

  if (artistLabBreadcrumbRoutes[pathname]) {
    items.push({
      title: 'Artist Studio'
    })

    items.push({
      title:
        artistLabBreadcrumbRoutes[
          pathname as keyof typeof artistLabBreadcrumbRoutes
        ]
    })
  }

  if (adminBreadcrumbRoutes[pathname as keyof typeof adminBreadcrumbRoutes]) {
    items.push({
      title: 'Admin'
    })

    items.push({
      title:
        adminBreadcrumbRoutes[pathname as keyof typeof adminBreadcrumbRoutes]
    })
  }

  if (items.length === 0) {
    return <p />
  }

  return <Breadcrumb className="mr-auto" items={items} />
}
