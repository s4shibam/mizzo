import { Request, Response } from 'express'

import axios from 'axios'
import { z } from 'zod'

import { prisma } from '@mizzo/prisma'
import { s3GetUrlFromKey } from '@mizzo/utils'

import { throwError } from '../../utils/throw-error'

export const streamTrack = async (req: Request, res: Response) => {
  const { trackId } = zStreamTrackReqParams.parse(req.params)

  const track = await prisma.track.findUnique({
    where: {
      id: trackId
    },
    select: {
      trackKey: true
    }
  })

  const trackUrl = s3GetUrlFromKey(track?.trackKey)

  if (!track?.trackKey || !trackUrl) {
    throwError('Track not found', 404)
  }

  const range = req.headers.range

  if (!range) {
    throwError('Requires Range header', 400)
  }

  const headResponse = await axios.head(trackUrl)
  const fileSize = headResponse.headers['content-length']
  const parts = range.replace(/bytes=/, '').split('-')
  const start = parseInt(parts[0], 10)
  const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

  if (start >= fileSize || end >= fileSize) {
    throwError(`Requested range not satisfiable\n ${start} >= ${fileSize}`, 416)
  }

  const chunkSize = end - start + 1
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'audio/mpeg'
  }

  res.writeHead(206, headers)

  const response = await axios({
    method: 'get',
    url: track.trackKey,
    responseType: 'stream',
    headers: {
      Range: `bytes=${start}-${end}`
    }
  })

  response.data.pipe(res)
  response.data.on('end', () => {
    res.end()
  })
  response.data.on('error', (err: any) => {
    console.error(err)
    throwError('Error streaming the track', 500)
  })
}

const zStreamTrackReqParams = z.object({
  trackId: z.string().cuid2()
})
