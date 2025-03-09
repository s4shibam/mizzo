import { useCallback, useState } from 'react'

/**
 * A hook that provides copy to clipboard functionality
 * @param timeout The timeout in ms for the "copied" state to reset
 * @returns An object with the copied state, copy function, and reset function
 */
export const useClipboard = (timeout = 2000) => {
  const [isCopied, setIsCopied] = useState(false)
  const [copyError, setCopyError] = useState<Error | null>(null)
  const [value, setValue] = useState<string>('')

  const reset = useCallback(() => {
    setIsCopied(false)
    setCopyError(null)
  }, [])

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator?.clipboard) {
          await navigator.clipboard.writeText(text)
        } else {
          throw new Error('Clipboard is not supported')
        }

        setValue(text)
        setIsCopied(true)
        setCopyError(null)

        // Reset after timeout
        const timeoutId = setTimeout(() => {
          reset()
        }, timeout)

        return () => clearTimeout(timeoutId)
      } catch (error) {
        setCopyError(
          error instanceof Error ? error : new Error('Failed to copy')
        )
        return () => {}
      }
    },
    [timeout, reset]
  )

  return { isCopied, copy, reset, value, copyError }
}
