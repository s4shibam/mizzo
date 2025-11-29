import express, { json, Request, Response, urlencoded } from 'express'

import 'express-async-errors'

import cors from 'cors'
import morgan from 'morgan'

import { APP_SLUG_CAP } from '@mizzo/utils'

import { homePage } from './controllers/home/home'
import { errorHandler } from './middlewares/error-handler'
import { requestIdMiddleware } from './middlewares/request-id'
import { successHandler } from './middlewares/success-handler'
import { adminRouter } from './routes/admin'
import { artistRouter } from './routes/artist'
import { notificationRouter } from './routes/notification'
import { playlistRouter } from './routes/playlist'
import { searchRouter } from './routes/search'
import { secretRouter } from './routes/secret'
import { streamRouter } from './routes/stream'
import { trackRouter } from './routes/track'
import { userRouter } from './routes/user'
import { utilsRouter } from './routes/utils'
import { throwError } from './utils/throw-error'

// Initialization
const app = express()

// Middleware configuration
app.use(cors())
app.use(json({ limit: '5mb' }))
app.use(urlencoded({ limit: '5mb', extended: true }))
app.use(morgan('dev'))

app.use(requestIdMiddleware)

app.use(successHandler)

app.get('/', async (_req: Request, res: Response) => {
  res.status(200).send(homePage({ heading: `${APP_SLUG_CAP} Connect` }))
})

app.get('/api/v1/', async (_req: Request, res: Response) => {
  res
    .status(200)
    .send(homePage({ heading: `${APP_SLUG_CAP} Connect - API V1` }))
})

// Routes
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/artist', artistRouter)
app.use('/api/v1/notification', notificationRouter)
app.use('/api/v1/playlist', playlistRouter)
app.use('/api/v1/secret', secretRouter)
app.use('/api/v1/search', searchRouter)
app.use('/api/v1/stream', streamRouter)
app.use('/api/v1/track', trackRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/utils', utilsRouter)

// Handle unknown routes
app.all('*', (req) => {
  throwError(`Route '${req.originalUrl}' not found`, 404)
})

// Error Middleware configuration
app.use(errorHandler)

export default app
