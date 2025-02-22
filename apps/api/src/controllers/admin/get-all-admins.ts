import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const getAllAdmins = async (req: Request, res: Response) => {
  const admins = await prisma.user.findMany({
    where: { isAdmin: true },
    orderBy: {
      createdAt: 'desc'
    }
  })

  if (admins.length === 0) {
    throwError('No admin found', 404)
  }

  res.status(201).json({
    message: 'Successfully fetched all admins',
    data: admins
  })
}
