import axios from 'axios'

import { env } from '../constants/env'

export const isProfane = async (str: string[]) => {
  if (!env.enableProfanityCheck) {
    return { profane: false }
  }

  let message = null

  try {
    await Promise.all(
      str.map(async (val: string) => {
        message = val

        if (!message) {
          return
        }

        const res = await axios.post('https://vector.profanity.dev', {
          message
        })

        if (res.data.isProfanity) {
          throw new Error('Contains profane words')
        }
      })
    )

    return { profane: false }
  } catch (error) {
    const err = error as { error: string }
    console.error(`Payload: ${message}\nError: ${err.error}`)

    return { profane: true }
  }
}
