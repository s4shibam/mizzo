import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'
import { NODE_ENV } from '@mizzo/utils'

import { sendMail, type TSendEmailParams } from '../../services/mail'
import { generateOtp, hashPassword } from '../../utils/functions'
import { isProfanity } from '../../utils/profanity-check'
import { throwError } from '../../utils/throw-error'

export const sendSignupOtp = async (req: Request, res: Response) => {
  const { name, email, password } = zSendSignupOtpReqBody.parse(req.body)

  await isProfanity([name, email])

  const userWithSameEmail = await prisma.user.findFirst({
    where: {
      email
    }
  })

  if (userWithSameEmail) {
    throwError('User already exists', 409)
  }

  const generatedOtpResponse = generateOtp()

  await prisma.otp.deleteMany({ where: { email } })

  const hashedPasswordResponse = await hashPassword(password)

  await prisma.otp.create({
    data: {
      name,
      email,
      password: hashedPasswordResponse,
      otp: generatedOtpResponse
    }
  })

  const params: TSendEmailParams = {
    templateName: 'email_verification',
    recipientName: name,
    recipientEmail: email,
    otp: generatedOtpResponse
  }

  if (NODE_ENV === 'dev') {
    console.log('Email not sent in dev mode', params)

    res.status(200).json({
      message: 'OTP for email verification sent to given email'
    })
    return
  }

  await sendMail(params)

  res.status(200).json({
    message: 'OTP for email verification sent to given email'
  })
}

const zSendSignupOtpReqBody = z.object({
  name: z.string().min(1, 'Please enter name'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})
