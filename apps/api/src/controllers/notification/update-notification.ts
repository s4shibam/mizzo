import { Request, Response } from 'express'

import { z } from 'zod'

import { prisma } from '@mizzo/prisma'

import { throwError } from '../../utils/throw-error'

export const updateNotification = async (req: Request, res: Response) => {
  const userId = req.user.id
  const { notificationId } = zUpdateNotificationReqParams.parse(req.params)
  const { action } = zUpdateNotificationReqBody.parse(req.body)

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId
    }
  })

  if (!notification) {
    throwError('Notification not found', 404)
  }

  if (action === 'read') {
    await prisma.notification.update({
      where: {
        id: notificationId
      },
      data: {
        readAt: new Date()
      }
    })

    res.status(200).json({
      message: 'Notification marked as read'
    })

    return
  }

  if (action === 'delete') {
    await prisma.notification.delete({
      where: {
        id: notificationId
      }
    })

    res.status(200).json({
      message: 'Notification deleted successfully'
    })

    return
  }

  throwError('Invalid action', 400)
}

const zUpdateNotificationReqParams = z.object({
  notificationId: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), {
      message: 'ID must be a valid number'
    })
})

const zUpdateNotificationReqBody = z.object({
  action: z.enum(['read', 'delete'], {
    message: 'Action must be either "read" or "delete"'
  })
})
