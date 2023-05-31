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
import authorizationMiddleware from './core/middleware/authorization.middleware'
import validator from './core/middleware/validator'

// Controllers
import authController from './controllers/auth.controller'
import categoryAdminController from './controllers/category.admin.controller'
import userController from './controllers/user.controller'

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
router.get('/user', authorizationMiddleware, userController.information)

/** @define admin routes */
// category routes
router.get(
  '/categories',
  authorizationMiddleware,
  categoryAdminController.findAll
)
router.get(
  '/categories/:id',
  authorizationMiddleware,
  categoryAdminController.findOne
)
router.post(
  '/categories',
  authorizationMiddleware,
  categoryAdminController.create
)
router.put(
  '/categories/:id',
  authorizationMiddleware,
  categoryAdminController.update
)
router.delete(
  '/categories/:id',
  authorizationMiddleware,
  categoryAdminController.delete
)

export default router
