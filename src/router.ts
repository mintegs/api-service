import { Router } from 'express'
const router: Router = Router()

// Middleware

/** @define routes */
router.get('/', (req, res, next) => {
  return res.send('hello mf')
})

export default router
