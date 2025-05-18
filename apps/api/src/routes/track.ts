import { Router } from 'express'

import { deleteTrackById } from '../controllers/track/delete-track'
import { getLikeStatusOfTrack } from '../controllers/track/get-like-status-of-track'
import { getMyCollaboratedTracks } from '../controllers/track/get-my-collaborated-tracks'
import { getMyUploads } from '../controllers/track/get-my-uploads'
import { increaseTrackListens } from '../controllers/track/increase-track-listens'
import { toggleLikeOfTrack } from '../controllers/track/toggle-like-of-track'
import { togglePublicViewOfTrack } from '../controllers/track/toggle-public-view-of-track'
import { updateTrack } from '../controllers/track/update-track'
import { uploadTrack } from '../controllers/track/upload-track'
import { isAuthenticatedArtist } from '../middlewares/artist-authentication'
import { ratelimit } from '../middlewares/rate-limit'
import { isAuthenticatedUser } from '../middlewares/user-authentication'

const router = Router()

// Upload track
router.post(
  '/upload',
  ratelimit({
    strategy: 'fixedWindow',
    limit: 10,
    windowSizeInSeconds: 3600
  }),
  isAuthenticatedArtist,
  uploadTrack
)

// Update track
router.put('/:trackId', isAuthenticatedArtist, updateTrack)

// Get user uploaded tracks only
router.get('/my-uploads', isAuthenticatedArtist, getMyUploads)

// Get user collaborated (as secondary artist) tracks only
router.get('/my-collaborations', isAuthenticatedUser, getMyCollaboratedTracks)

// Check like status
router.get('/:trackId/like', isAuthenticatedUser, getLikeStatusOfTrack)

// Toggle like (like <-> unlike)
router.put(
  '/:trackId/like',
  ratelimit({
    strategy: 'fixedWindow',
    limit: 30,
    windowSizeInSeconds: 60
  }),
  isAuthenticatedUser,
  toggleLikeOfTrack
)

// Increment track listens
router.put(
  '/:trackId/listen',
  ratelimit({
    strategy: 'tokenBucket',
    capacity: 5,
    refillRate: 1
  }),
  increaseTrackListens
)

// Toggle public view
router.put(
  '/:trackId/public-view',
  isAuthenticatedArtist,
  togglePublicViewOfTrack
)

// Delete track by ID
router.delete('/:trackId', isAuthenticatedArtist, deleteTrackById)

export { router as trackRouter }
