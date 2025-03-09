import { useRouter, useSearchParams } from 'next/navigation'

import { buildQueryString } from '@/lib/build-query-string'

type TAction = 'push' | 'replace'

export const useQueryParams = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const qParams: { [key: string]: string } = {}

  searchParams.forEach((value, key) => {
    qParams[key] = value
  })

  const updateQParam = (
    filterKey: string,
    value: string | undefined,
    action: TAction = 'push'
  ) => {
    const updatedParams = { ...qParams, [filterKey]: value }
    const qs = buildQueryString(updatedParams)

    if (action === 'push')
      router.push(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    else {
      router.replace(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    }
  }

  const updateQParams = (
    newParams: { [key: string]: string | undefined },
    action: TAction = 'push'
  ) => {
    const updatedParams = { ...qParams, ...newParams }
    const qs = buildQueryString(updatedParams)

    if (action === 'push')
      router.push(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    else {
      router.replace(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    }
  }

  const removeQParam = (filterKey: string, action: TAction = 'push') => {
    const updatedParams = { ...qParams, [filterKey]: undefined }
    const qs = buildQueryString(updatedParams)

    if (action === 'push')
      router.push(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    else {
      router.replace(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    }
  }

  const removeAllQParams = (
    excludeKeys: string[] = [],
    action: TAction = 'push'
  ) => {
    const updatedParams: { [key: string]: string | undefined } = {}

    if (excludeKeys.length > 0) {
      excludeKeys.forEach((key) => {
        if (qParams[key] !== undefined) {
          updatedParams[key] = qParams[key]
        }
      })
    }

    const qs = buildQueryString(updatedParams)

    if (action === 'push')
      router.push(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    else {
      router.replace(qs ? `?${qs}` : window.location.pathname, {
        scroll: false
      })
    }
  }

  return {
    qParams,
    updateQParam,
    updateQParams,
    removeQParam,
    removeAllQParams
  }
}
