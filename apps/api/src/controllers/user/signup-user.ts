import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { generateTimeInMs, isExpired } from '../../utils/functions'
import { throwError } from '../../utils/throw-error'

export const signupUser = async (req: Request, res: Response) => {
  const { email, userOtp } = zSignupUserReqBody.parse(req.body)

  const storedOtp = await prisma.otp.findUnique({ where: { email } })

  if (!storedOtp) {
    throwError('Invalid or expired OTP', 400)
  }

  const isOtpExpired = isExpired({
    timestamp: storedOtp.createdAt,
    expirationTime: generateTimeInMs({ minute: 10 })
  })

  if (!storedOtp || isOtpExpired) {
    if (isOtpExpired) {
      await prisma.otp.delete({ where: { email } })
    }
    throwError('Invalid or expired OTP', 400)
  }

  const isOtpMatched = userOtp === storedOtp.otp

  if (!isOtpMatched) {
    throwError('Invalid or expired OTP', 400)
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        name: storedOtp.name,
        email,
        password: storedOtp.password,
        profile: { create: {} }
      }
    })

    await tx.otp.delete({ where: { email } })
  })

  res.status(201).json({
    message: 'Account created successfully'
  })
}

const zSignupUserReqBody = z.object({
  email: z.string().email('Invalid email format'),
  userOtp: z.string().length(6, 'OTP must be 6 characters')
})
