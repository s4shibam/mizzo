import crypto from 'crypto'
import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'
import { NODE_ENV } from '@mizzo/utils'

import { sendMail, type TSendEmailParams } from '../../services/mail'
import { isExpired } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const forgotPassword = async (req: Request, res: Response) => {
  let resetToken = ''
  const { email } = zForgotPasswordReqBody.parse(req.body)

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    throwError('User not found', 404)
  }

  const userId = user.id

  const resetTokenObj = await prisma.userResetToken.findUnique({
    where: { userId }
  })

  if (resetTokenObj) {
    const isTokenExpired = isExpired({
      timestamp: resetTokenObj.createdAt,
      expirationTime: 60 * 60 * 1000
    })
    if (isTokenExpired) {
      await prisma.userResetToken.delete({ where: { userId } })
    } else {
      resetToken = resetTokenObj.token
    }
  } else {
    resetToken = crypto.randomBytes(32).toString('hex')

    await prisma.userResetToken.create({
      data: {
        userId,
        token: resetToken
      }
    })
  }
  const params: TSendEmailParams = {
    templateName: 'reset_password',
    recipientName: user.name,
    recipientEmail: email,
    resetToken,
    userId
  }

  if (NODE_ENV === 'development') {
    console.log('Email not sent in dev mode', params)

    res.status(200).json({
      message: 'Password reset link generated'
    })
    return
  }

  await sendMail(params)

  res.status(200).json({
    message: 'Password reset link sent to given email'
  })
}

const zForgotPasswordReqBody = z.object({
  email: z.string().email('Invalid email format')
})
