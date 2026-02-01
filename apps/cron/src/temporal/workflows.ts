import { proxyActivities } from '@temporalio/workflow'

import type * as activities from './activities'

type TTrackLiveLyricWorkflowArgs = {
  trackId: string
  audioS3Key: string
  duration: number
  title: string
  language: string
}

const { updateTrackLiveLyricById, getAudioUrl } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '10 seconds'
})

const { generateLyrics } = proxyActivities<typeof activities>({
  startToCloseTimeout: '2 minutes',
  retry: {
    maximumAttempts: 3
  }
})

export const trackLiveLyricWorkflow = async (
  args: TTrackLiveLyricWorkflowArgs
) => {
  try {
    await updateTrackLiveLyricById({
      trackId: args.trackId,
      status: 'PROCESSING'
    })

    const audioUrl = await getAudioUrl({ audioS3Key: args.audioS3Key })

    const content = await generateLyrics({
      audioUrl,
      duration: args.duration,
      title: args.title,
      language: args.language
    })

    await updateTrackLiveLyricById({
      trackId: args.trackId,
      status: 'COMPLETED',
      content
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown workflow error'

    await updateTrackLiveLyricById({
      trackId: args.trackId,
      status: 'FAILED',
      errorMessage: message
    })
  }
}
