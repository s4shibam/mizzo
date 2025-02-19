import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import {
  comparePassword,
  generateTimeInMs,
  hashPassword,
  isExpired
} from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, resetToken, password } = zResetPasswordReqBody.parse(req.body)

  const resetTokenObj = await prisma.userResetToken.findFirst({
    where: { userId, token: resetToken },
    include: { user: true }
  })

  if (
    !resetTokenObj ||
    isExpired({
      timestamp: resetTokenObj.createdAt,
      expirationTime: generateTimeInMs({ hour: 1 })
    })
  ) {
    throwError('Link has expired or is invalid', 400)
  }

  const isSamePassword = await comparePassword({
    password,
    hashedPassword: resetTokenObj.user.password
  })

  if (isSamePassword) {
    throwError('New password must be different from the old password', 400)
  }

  const newHashedPassword = await hashPassword(password)

  await prisma.user.update({
    where: { id: userId },
    data: {
      password: newHashedPassword
    }
  })

  await prisma.userResetToken.delete({
    where: { userId: userId, token: resetToken }
  })

  res.status(200).json({
    message: 'Password updated successfully'
  })
}

const zResetPasswordReqBody = z.object({
  userId: z.string().cuid2(),
  resetToken: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
})
