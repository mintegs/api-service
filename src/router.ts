import { Router } from 'express'
const router: Router = Router()

// Middleware

// Controllers
import authController from './controllers/auth.controller'

/** @define routes */
// auth routes
router.post('/auth/sign-up', authController.signUp)
router.post('/auth/sign-in', authController.signIn)
router.get('/auth/google', authController.google)
router.get('/auth/github', authController.github)
router.get('/auth/verify-identity/:code', authController.verifyIdentity)

export default router
