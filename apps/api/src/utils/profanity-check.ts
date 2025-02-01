import axios from 'axios'

import { throwError } from './throw-error'

export const isProfanity = async (str: (string | null | undefined)[]) => {
  await Promise.all(
    str.map(async (val: string | null | undefined) => {
      if (!val) {
        return
      }

      const res = await axios.post('https://vector.profanity.dev', {
        message: val
      })

      if (res.data.isProfanity) {
        throwError(`You cannot use the word: ${res.data.flaggedFor} `, 400)
      }
    })
  )
}
