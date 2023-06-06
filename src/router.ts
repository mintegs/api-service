import * as express from 'express'
import { Router } from 'express'
import {
  categoryDtoSchema,
  signInGithubSchema,
  signInGoogleSchema,
  signInSchema,
  signUpSchema,
} from './core/lib/validation.schema'
const router: Router = express.Router()

// middleware
import authorizationMiddleware from './core/middleware/authorization.middleware'
import validator from './core/middleware/validator'

// Controllers
import categoryAdminController from './controllers/admin/category.admin.controller'
import authController from './controllers/auth.controller'
import currentUserController from './controllers/current.user.controller'
import sessionUserController from './controllers/user/session.user.controller'
import accessLevelMiddleware from './core/middleware/accessLevel.middleware'

/** @define routes */
// auth routes
router.post('/auth/sign-up', validator(signUpSchema), authController.signUp)
router.post('/auth/sign-in', validator(signInSchema), authController.signIn)
router.get('/auth/google', validator(signInGoogleSchema), authController.google)
router.get('/auth/github', validator(signInGithubSchema), authController.github)
router.get('/auth/verify-identity/:code', authController.verifyIdentity)

// user routes
router.get('/user', authorizationMiddleware, currentUserController.information)
router.get(
  '/user/sessions',
  authorizationMiddleware,
  sessionUserController.findAll
)
router.delete(
  '/user/sessions/:id',
  authorizationMiddleware,
  sessionUserController.delete
)

/** @define admin routes */
// category routes
router.get(
  '/admin/categories',
  authorizationMiddleware,
  accessLevelMiddleware('ADMIN'),
  categoryAdminController.findAll
)
router.get(
  '/admin/categories/:id',
  authorizationMiddleware,
  accessLevelMiddleware('ADMIN'),
  categoryAdminController.findOne
)
router.post(
  '/admin/categories',
  authorizationMiddleware,
  accessLevelMiddleware('ADMIN'),
  validator(categoryDtoSchema),
  categoryAdminController.create
)
router.put(
  '/admin/categories/:id',
  authorizationMiddleware,
  validator(categoryDtoSchema),
  categoryAdminController.update
)
router.delete(
  '/admin/categories/:id',
  authorizationMiddleware,
  accessLevelMiddleware('ADMIN'),
  categoryAdminController.delete
)

export default router
