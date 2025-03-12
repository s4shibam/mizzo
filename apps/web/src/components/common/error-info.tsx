import type { ReactNode } from 'react'

import { LuOctagonAlert } from 'react-icons/lu'

import { cn, type TError } from '@mizzo/utils'

type ErrorInfoProps = {
  className?: string
  error?: TError | null

  customIcon?: ReactNode
  customMessage?: string
  customStatusCode?: number
  children?: ReactNode
}

export const ErrorInfo = ({
  className,
  error,
  customIcon,
  customMessage,
  customStatusCode,
  children
}: ErrorInfoProps) => {
  const code = error?.statusCode?.toString() || customStatusCode?.toString()
  const message = error?.message || customMessage || 'Unknown error occurred'

  const getErrorTitle = () => {
    if (!code) return 'Unknown Error'

    if (code === '404') return 'Not Found'
    if (code === '401') return 'Unauthorized'
    if (code === '403') return 'Access Denied'

    return code.startsWith('4') ? 'Request Error' : 'Server Error'
  }

  if (!error && !customStatusCode && !customMessage) {
    return null
  }

  return (
    <div
      className={cn(
        'flex size-full flex-col items-center justify-center gap-5 p-6',
        className
      )}
    >
      {customIcon || <LuOctagonAlert className="size-16 text-red-500" />}

      <div className="text-center">
        <h2 className="mb-3 text-3xl font-semibold text-zinc-800">
          {getErrorTitle()}
        </h2>
        <p className="mt-4 max-w-md text-lg text-zinc-600">{message}</p>
        <p className="mt-2 text-sm text-zinc-500">
          {code?.startsWith('4')
            ? "We couldn't find what you're looking for."
            : "We're having some trouble on our end."}
        </p>

        {code && (
          <span className="text-sm font-medium text-red-500">({code})</span>
        )}
      </div>

      {children}
    </div>
  )
}
