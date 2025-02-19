import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { comparePassword, hashPassword } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const updatePassword = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { oldPassword, newPassword } = zUpdatePasswordReqBody.parse(req.body)

  const isSamePassword = await comparePassword({
    password: oldPassword,
    hashedPassword: req.user.password
  })

  if (!isSamePassword) {
    throwError('Incorrect old password', 401)
  }

  if (oldPassword === newPassword) {
    throwError('New password should be different from the old password', 400)
  }

  const newHashedPasswordResponse = await hashPassword(newPassword)

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newHashedPasswordResponse
    }
  })

  res.status(200).json({ message: 'Password updated successfully' })
}

const zUpdatePasswordReqBody = z.object({
  oldPassword: z.string().min(1, 'Please enter old password'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters')
})
