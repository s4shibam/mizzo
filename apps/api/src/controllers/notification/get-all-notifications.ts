import { Request, Response } from 'express'

import { prisma } from '@mizzo/prisma'

export const getAllNotifications = async (req: Request, res: Response) => {
  const userId = req.user.id

  const notifications = await prisma.notification.findMany({
    where: {
      userId,
      readAt: null
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const unreadCount = await prisma.notification.count({
    where: {
      userId,
      readAt: null
    }
  })

  res.status(200).json({
    message: 'Notifications retrieved successfully',
    data: {
      notifications,
      unreadCount
    }
  })
}
