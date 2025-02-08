import { Router } from 'express'

import { forgotPassword } from '../controllers/user/forgot-password'
import { getArtistApplicationStatus } from '../controllers/user/get-artist-application-status'
import { getMyProfile } from '../controllers/user/get-my-profile'
import { loginUser } from '../controllers/user/login-user'
import { resetPassword } from '../controllers/user/reset-password'
import { sendSignupOtp } from '../controllers/user/send-signup-otp'
import { signupUser } from '../controllers/user/signup-user'
import { submitArtistApplication } from '../controllers/user/submit-artist-application'
import { togglePublicViewOfProfile } from '../controllers/user/toggle-public-view-of-profile'
import { updatePassword } from '../controllers/user/update-password'
import { updateProfile } from '../controllers/user/update-profile'
import { isAuthenticatedUser } from '../middlewares/user-authentication'

const router = Router()

// Send email validation OTP to email
router.post('/send-signup-otp', sendSignupOtp)

// Sign up
router.post('/signup', signupUser)

// Log in
router.post('/login', loginUser)

// Get profile
router.get('/my-profile', isAuthenticatedUser, getMyProfile)

// Update password using current password
router.put('/update-password', isAuthenticatedUser, updatePassword)

// Update profile
router.put('/update-profile', isAuthenticatedUser, updateProfile)

// Toggle public profile
router.put('/public-view', isAuthenticatedUser, togglePublicViewOfProfile)

// Send password reset link to email
router.post('/forgot-password', forgotPassword)

// Reset password in database via reset link
router.put('/reset-password', resetPassword)

router.post('/artist-application', isAuthenticatedUser, submitArtistApplication)

router.get(
  '/artist-application-status',
  isAuthenticatedUser,
  getArtistApplicationStatus
)

export { router as userRouter }
