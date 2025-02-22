import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const updateAdmin = async (req: Request, res: Response) => {
  const { adminId } = zUpdateAdminReqParams.parse(req.params)

  const user = await prisma.user.findUnique({
    where: {
      id: adminId
    }
  })

  if (!user) {
    throwError('User not found', 404)
  }

  const isCurrentlyAdmin = user.isAdmin
  const adminCount = await prisma.user.count({ where: { isAdmin: true } })

  if (adminCount === 1 && isCurrentlyAdmin) {
    throwError('Cannot remove the only admin', 400)
  }

  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      isAdmin: !isCurrentlyAdmin
    }
  })

  res.status(201).json({
    message: `${user.name} is now ${!isCurrentlyAdmin ? 'an admin' : 'no longer an admin'}`
  })
}

const zUpdateAdminReqParams = z.object({
  adminId: z.string().cuid2()
})
