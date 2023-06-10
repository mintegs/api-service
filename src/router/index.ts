import * as express from 'express'
import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'
const router: Router = express.Router()

// middleware
import accessLevelMiddleware from '../core/middleware/accessLevel.middleware'
import authorizationMiddleware from '../core/middleware/authorization.middleware'
import adminRouter from './admin'

// routes
router.use('/auth', authRouter)
router.use('/user', authorizationMiddleware, userRouter)
router.use(
  '/admin',
  authorizationMiddleware,
  accessLevelMiddleware('ADMIN'),
  adminRouter
)

export default router
