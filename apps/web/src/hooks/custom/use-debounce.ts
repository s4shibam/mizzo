import { useEffect, useState } from 'react'

/**
 * A self-sufficient hook that manages raw state internally and debounces it
 * @param initialRawValue The initial value for the raw state
 * @param delay The delay in milliseconds before updating the debounced value
 * @returns An array containing [rawValue, setRawValue, debouncedValue]
 */
export const useDebounce = <T>(
  initialRawValue: T,
  delay: number
): [T, (value: T) => void, T] => {
  const [rawValue, setRawValue] = useState<T>(initialRawValue)
  const [debouncedValue, setDebouncedValue] = useState<T>(initialRawValue)

  // Sync rawValue when initialRawValue changes (e.g., from query params)
  useEffect(() => {
    setRawValue(initialRawValue)
  }, [initialRawValue])

  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(rawValue)
    }, delay)

    // Clean up the timeout if the value changes before the delay has passed
    return () => {
      clearTimeout(timer)
    }
  }, [rawValue, delay])

  return [rawValue, setRawValue, debouncedValue]
}
