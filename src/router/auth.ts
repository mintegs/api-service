import * as express from 'express'
import { Router } from 'express'
const authRouter: Router = express.Router()

// validation schema
import {
  signInGithubSchema,
  signInGoogleSchema,
  signInSchema,
  signUpSchema,
} from '../core/lib/validation.schema'

// middleware
import validator from '../core/middleware/validator'

// controller
import authController from '../controllers/auth.controller'

authRouter.post('/sign-up', validator(signUpSchema), authController.signUp)
authRouter.post('/sign-in', validator(signInSchema), authController.signIn)
authRouter.get('/google', validator(signInGoogleSchema), authController.google)
authRouter.get('/github', validator(signInGithubSchema), authController.github)
authRouter.get('/verify-identity/:code', authController.verifyIdentity)

export default authRouter
