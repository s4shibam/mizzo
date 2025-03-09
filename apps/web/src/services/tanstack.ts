import {
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient
} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 2000 * 10,
      refetchOnWindowFocus: false
    }
  }
})

export const invalidateQueries = (
  filters?: InvalidateQueryFilters,
  options?: InvalidateOptions
) => queryClient.invalidateQueries(filters, options)
