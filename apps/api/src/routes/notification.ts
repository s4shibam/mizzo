import { Router } from 'express'

import { getAllNotifications } from '../controllers/notification/get-all-notifications'
import { updateNotification } from '../controllers/notification/update-notification'
import { isAuthenticatedUser } from '../middlewares/user-authentication'

const router = Router()

// Get all notifications
router.get('/all', isAuthenticatedUser, getAllNotifications)

// Update notification (read/delete)
router.put('/:notificationId', isAuthenticatedUser, updateNotification)

export { router as notificationRouter }
