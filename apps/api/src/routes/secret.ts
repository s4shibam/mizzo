import { Router } from 'express'

import { getProcessingTrackCount } from '../controllers/secret/get-processing-track-count'
import { updateTrackStatus } from '../controllers/secret/update-track-status'
import { isCorrectSecret } from '../middlewares/secret-authentication'

const router = Router()

router.use(isCorrectSecret)

router.get('/processing-track-count', getProcessingTrackCount)

router.put('/track-status/:trackId', updateTrackStatus)

export { router as secretRouter }
