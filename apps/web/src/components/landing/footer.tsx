import Link from 'next/link'
import { FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { Branding } from '../common/branding'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#features' },
        { text: 'Premium', href: '/premium' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { text: 'Terms', href: '/t&c' },
        { text: 'Privacy', href: '/t&c' }
      ]
    }
  ]

  const socialLinks = [
    { icon: <FiTwitter className="size-5" />, href: '#' },
    { icon: <FiInstagram className="size-5" />, href: '#' },
    {
      icon: <FiGithub className="size-5" />,
      href: 'https://github.com/s4shibam/mizzo'
    }
  ]

  return (
    <footer className="border-t bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Branding />
            <p className="mt-4 max-w-md text-zinc-600">
              Discover, stream, and share your favorite music with{' '}
              {APP_SLUG_CAP}.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  className="hover:border-primary hover:text-primary grid size-10 place-items-center rounded-full border border-zinc-200 text-zinc-600 transition-colors"
                  href={link.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="mb-4 text-lg font-semibold">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className="hover:text-primary mz-text-transition text-zinc-600"
                      href={link.href}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-center text-zinc-500">
          <p>
            © {currentYear} {APP_SLUG_CAP}
          </p>
        </div>
      </div>
    </footer>
  )
}
