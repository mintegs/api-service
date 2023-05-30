import * as express from 'express'
import { Router } from 'express'
import {
  signInGithubSchema,
  signInGoogleSchema,
  signInSchema,
  signUpSchema,
  verifyIdentitySchema,
} from './core/lib/validation.schema'
const router: Router = express.Router()

// middleware
import validator from './core/middleware/validator'

// Controllers
import authController from './controllers/auth.controller'

/** @define routes */
// auth routes
router.post('/auth/sign-up', validator(signUpSchema), authController.signUp)
router.post('/auth/sign-in', validator(signInSchema), authController.signIn)
router.get('/auth/google', validator(signInGoogleSchema), authController.google)
router.get('/auth/github', validator(signInGithubSchema), authController.github)
router.get(
  '/auth/verify-identity/:code',
  validator(verifyIdentitySchema),
  authController.verifyIdentity
)

// user routes
router.get('/user')
export default router
