import { google } from '@ai-sdk/google'
import { generateText, Output } from 'ai'
import axios from 'axios'
import { z } from 'zod'

import { s3PresignedDownloadUrl } from '@mizzo/aws'

import { env } from '../env'
import { getLiveLyricsPrompt } from '../prompts/live-lyrics'

type TTrackLiveLyricStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'

type TLiveLyricContent = {
  lines: Array<{ startTime: number; endTime: number; text: string }>
}

type TUpdateTrackLiveLyricByIdArgs = {
  trackId: string
  status: TTrackLiveLyricStatus
  content?: TLiveLyricContent | null
  errorMessage?: string | null
  workflowId?: string | null
}

type TGetAudioUrlArgs = {
  audioS3Key: string
}

type TGenerateLyricsArgs = {
  audioUrl: string
  duration: number
  title: string
  language: string
}

const lyricsSchema = z.object({
  lines: z.array(
    z.object({
      startTime: z.number(),
      endTime: z.number(),
      text: z.string()
    })
  )
})

export const updateTrackLiveLyricById = async ({
  trackId,
  status,
  content,
  errorMessage,
  workflowId
}: TUpdateTrackLiveLyricByIdArgs) => {
  if (env.apiUrl === 'NA' || env.apiSecretKey === 'NA') {
    throw new Error('API URL or secret key not configured')
  }

  await axios.put(
    `${env.apiUrl}/secret/track-live-lyric/${trackId}`,
    {
      status,
      content,
      errorMessage,
      workflowId
    },
    {
      headers: { Authorization: `Bearer ${env.apiSecretKey}` },
      timeout: 10000
    }
  )
}

export const getAudioUrl = async ({ audioS3Key }: TGetAudioUrlArgs) => {
  const { downloadUrl } = await s3PresignedDownloadUrl({ s3Key: audioS3Key })
  return downloadUrl
}

export const generateLyrics = async ({
  audioUrl,
  duration,
  title,
  language
}: TGenerateLyricsArgs): Promise<TLiveLyricContent> => {
  if (env.googleGenerativeAiApiKey === 'NA') {
    throw new Error('Google Generative AI API key not configured')
  }

  const { system, messages } = getLiveLyricsPrompt({
    title,
    language,
    duration,
    audioUrl
  })

  const { output } = await generateText({
    model: google('gemini-2.5-flash'),
    output: Output.object({
      schema: lyricsSchema
    }),
    system,
    messages,
    temperature: 0,
    topP: 0.9
  })

  if (!output) {
    throw new Error('No lyrics generated')
  }

  return output
}
