import { Button } from 'antd'
import Link from 'next/link'

import { Branding } from '../common/branding'

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-zinc-100 bg-white py-3">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Branding />

        <Link href="/auth/sign-in">
          <Button className="rounded-full px-6" size="large" type="primary">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  )
}
