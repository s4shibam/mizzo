import { Router } from 'express'

import { createDownloadUrl } from '../controllers/utils/create-download-url'
import { createUploadUrl } from '../controllers/utils/create-upload-url'

const router = Router()

// Create presigned upload URL for a file
router.post('/upload-url', createUploadUrl)

// Create download URL for a file
router.post('/download-url', createDownloadUrl)

export { router as utilsRouter }
