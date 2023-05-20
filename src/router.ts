import { Router } from 'express'
const router: Router = Router()

// Middleware

// Controllers
import authController from './controllers/auth.controller'

/** @define routes */
router.get('/', (req, res, next) => {
  return res.send(authController.register())
})

export default router
