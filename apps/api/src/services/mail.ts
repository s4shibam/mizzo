import { sesSendEmail } from '@mizzo/aws'
import { log } from '@mizzo/logger'
import { APP_SLUG, capitalize, WEB_URL } from '@mizzo/utils'

import { EMAIL_TEMPLATE } from '../constants/mail'
import { emailVerificationTemplate } from '../templates/email-verification'
import { resetPasswordTemplate } from '../templates/reset-password'
import type { TEmailTemplate } from '../types/mail'

const getEmailSubject = (templateName: TEmailTemplate): string => {
  const emailSubjects: Record<TEmailTemplate, string> = {
    welcome: 'Welcome to the world of music',
    reset_password: 'Password reset link',
    email_verification: 'Email address verification'
  }

  return `${capitalize(APP_SLUG)}: ${emailSubjects[templateName] || 'Notification'}`
}

type TBaseEmailParams = {
  templateName: TEmailTemplate
  recipientName: string
  recipientEmail: string
}

type TEmailVerificationParams = TBaseEmailParams & {
  templateName: typeof EMAIL_TEMPLATE.email_verification
  otp: string
}

type TResetPasswordParams = TBaseEmailParams & {
  templateName: typeof EMAIL_TEMPLATE.reset_password
  resetToken: string
  userId: string
}

export type TSendEmailParams = TEmailVerificationParams | TResetPasswordParams

export const sendMail = async (params: TSendEmailParams): Promise<void> => {
  const { templateName, recipientName, recipientEmail } = params
  const subject = getEmailSubject(templateName)

  let htmlContent: string | null = null

  if (templateName === 'reset_password') {
    const { resetToken, userId } = params
    const resetLink = `${WEB_URL}/reset-password?userId=${userId}&resetToken=${resetToken}`

    htmlContent = resetPasswordTemplate({
      recipientName,
      recipientEmail,
      resetLink
    })
  } else if (templateName === 'email_verification') {
    const { otp } = params

    htmlContent = emailVerificationTemplate({
      recipientName,
      recipientEmail,
      otp
    })
  }

  if (!htmlContent) {
    throw new Error('Invalid email template')
  }

  try {
    await sesSendEmail({
      toAddresses: [recipientEmail],
      content: {
        subject,
        htmlBody: htmlContent
      }
    })

    log.info({
      message: `Email (${templateName}) sent to ${recipientEmail}`,
      meta: params,
      app: 'API'
    })
  } catch (error) {
    log.error({
      message: `Failed to send email (${templateName}) to ${recipientEmail}`,
      meta: {
        error,
        params
      },
      app: 'API'
    })
    throw new Error('Failed to send email')
  }
}
