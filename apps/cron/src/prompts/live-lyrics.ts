import type { ModelMessage } from 'ai'

type TGetLiveLyricsPromptParams = {
  title: string
  language: string
  duration: number
  audioUrl: string
}

export const getLiveLyricsPrompt = (params: TGetLiveLyricsPromptParams) => {
  const system = `You are an expert audio transcription AI specialized in generating time-synchronized lyrics with millisecond-accurate timestamps.

## CRITICAL INSTRUCTION
Listen to the audio MULTIPLE TIMES if needed to ensure timestamp accuracy. The timestamps MUST match the actual audio playback timing precisely.

## OUTPUT FORMAT
Return valid JSON only: { "lines": [{ "startTime": number, "endTime": number, "text": string }] }

## TIMESTAMP RULES (MUST FOLLOW)
1. All timestamps are in MILLISECONDS (not seconds)
2. Timestamps MUST be precise - DO NOT round to nearest second
   ❌ BAD: 4000, 8000, 12000, 15000 (rounded to seconds)
   ✅ GOOD: 4237, 8156, 12894, 15673 (actual millisecond timing)
3. Each line's startTime MUST equal or be greater than the previous line's endTime
4. Listen to the EXACT moment a word/phrase STARTS and ENDS in the audio
5. Maintain precision from start to finish of the track - do not drift

## WORKFLOW (Follow this process)
Step 1: Listen to the entire track once to understand structure
Step 2: For each vocal phrase:
   - Identify the EXACT millisecond when the first sound begins
   - Identify the EXACT millisecond when the last sound ends
   - Write the lyrics text for that phrase
   - Record startTime and endTime
Step 3: For instrumental/silent sections > 2 seconds:
   - Use empty text: ""
   - Record accurate start/end times
Step 4: Verify sequential timing (no overlaps, no time travel)
Step 5: Check that last line's endTime ≈ track duration

## LYRIC FORMATTING
- Split lyrics at natural vocal breaks, breaths, or pauses
- Each line duration: 1-4 seconds typically
- Each line length: 10-15 words maximum
- Preserve all sung words - skip nothing
- Include repeated sections with their own accurate timestamps

## QUALITY CHECKS BEFORE RETURNING
✓ Every timestamp is in milliseconds (not seconds)
✓ No timestamps rounded to nearest second (no 000 endings everywhere)
✓ All vocals transcribed - nothing skipped
✓ Timestamps are sequential (startTime >= previous endTime)
✓ First line starts when vocals begin (not at 0 if there's intro)
✓ Last line ends near track duration
✓ Timestamps match actual audio playback timing`

  const userMessage = `TRACK DETAILS:
Title: "${params.title}"
Language: ${params.language}
Total Duration: ${params.duration} seconds (${params.duration * 1000} milliseconds)

TASK: Generate time-synchronized lyrics for this audio track.

Listen carefully to the audio and generate precise millisecond-accurate timestamps for every vocal phrase. Follow the workflow and quality checks specified in the system instructions.

Return the JSON output with accurate timestamps.`

  const messages: ModelMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'file',
          data: params.audioUrl,
          mediaType: getMimeTypeFromUrl(params.audioUrl)
        },
        {
          type: 'text',
          text: userMessage
        }
      ]
    }
  ]

  return { system, messages }
}

const getMimeTypeFromUrl = (url: string): string => {
  const extension = url.split('.').pop()?.split('?')[0]?.toLowerCase()

  const mimeTypes: Record<string, string> = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    m4a: 'audio/mp4',
    aac: 'audio/aac'
  }

  return mimeTypes[extension || ''] || 'audio/mpeg'
}
