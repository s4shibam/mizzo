import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getArtistApplicationStatus = async (
  req: Request,
  res: Response
) => {
  const userId = req.user.id

  const artistApplication = await prisma.userArtistApplication.findUnique({
    where: {
      userId
    }
  })

  if (!artistApplication) {
    throwError('Application not found', 404)
  }

  res.status(200).json({
    message: 'Artist application submitted successfully',
    data: artistApplication
  })
}
