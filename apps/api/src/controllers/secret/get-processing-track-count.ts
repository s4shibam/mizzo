import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

export const getProcessingTrackCount = async (req: Request, res: Response) => {
  const count = await prisma.track.count({ where: { status: 'PROCESSING' } })

  res.json({
    message: 'Success',
    data: count
  })
}
