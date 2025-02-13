import { Router } from 'express'

import { streamTrack } from '../controllers/stream/stream-track'

const router = Router()

router.get('/:trackId', streamTrack)

export { router as streamRouter }
