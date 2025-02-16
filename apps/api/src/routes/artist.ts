import { Router } from 'express'

import { getArtistDashboardSummary } from '../controllers/artist/get-artist-dashboard-summary'
import { isAuthenticatedArtist } from '../middlewares/artist-authentication'

const router = Router()

router.get(
  '/home/dashboard-summary',
  isAuthenticatedArtist,
  getArtistDashboardSummary
)

export { router as artistRouter }
