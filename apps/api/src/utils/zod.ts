import { z } from 'zod'

export const zPagination = z.object({
  currentPage: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10)
})
