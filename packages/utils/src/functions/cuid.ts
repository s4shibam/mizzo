import { createId, isCuid as isCuid2 } from '@paralleldrive/cuid2'

export const generateCuid = () => createId()

export const isCuid = (val: string) => isCuid2(val)
