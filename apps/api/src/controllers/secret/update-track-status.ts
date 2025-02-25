import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma, Status } from '@mizzo/prisma'

export const updateTrackStatus = async (req: Request, res: Response) => {
  const { trackId } = zUpdateTrackStatusReqQParams.parse(req.params)
  const { status } = zUpdateTrackStatusReqBody.parse(req.body)

  await prisma.track.update({
    where: { id: trackId },
    data: { status }
  })

  res.status(200).json({ message: 'Success' })
}

const zUpdateTrackStatusReqQParams = z.object({
  trackId: z.string()
})

const zUpdateTrackStatusReqBody = z.object({
  status: z.nativeEnum(Status, {
    message: 'Invalid status value'
  })
})
