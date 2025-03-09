import { useState } from 'react'

type UseFilterProps<T extends Record<string, any>> = {
  filter: T
  updateFilter: (fields: Partial<T>) => void
}

export const useFilter = <T extends Record<string, any>>(
  initialFilter: T
): UseFilterProps<T> => {
  const [filter, setFilter] = useState<T>(initialFilter)

  const updateFilter = (fields: Partial<T>): void => {
    setFilter((prev) => ({ ...prev, ...fields }))
  }

  return { filter, updateFilter }
}
