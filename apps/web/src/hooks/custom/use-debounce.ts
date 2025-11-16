import { useEffect, useState } from 'react'

export const useDebounce = <T>(
  initialRawValue: T,
  delay: number
): [T, (value: T) => void, T] => {
  const [rawValue, setRawValue] = useState<T>(initialRawValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialRawValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(rawValue)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [rawValue, delay])

  return [rawValue, setRawValue, debouncedValue]
}
