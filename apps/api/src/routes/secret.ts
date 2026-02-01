import { Router } from 'express'

import { getProcessingTrackCount } from '../controllers/secret/get-processing-track-count'
import { updateTrackLiveLyric } from '../controllers/secret/update-track-live-lyric'
import { updateTrackStatus } from '../controllers/secret/update-track-status'
import { isCorrectSecret } from '../middlewares/secret-authentication'

const router = Router()

router.use(isCorrectSecret)

router.get('/processing-track-count', getProcessingTrackCount)

router.put('/track-status/:trackId', updateTrackStatus)

router.put('/track-live-lyric/:trackId', updateTrackLiveLyric)

export { router as secretRouter }
