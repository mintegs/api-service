import * as express from 'express'
import { Router } from 'express'
const userRouter: Router = express.Router()

// validation schema
import { articleDtoSchema } from '../core/lib/validation.schema'

// middleware
import validator from '../core/middleware/validator'

// controller
import currentUserController from '../controllers/current.user.controller'
import articleUserController from '../controllers/user/article.user.controller'
import sessionUserController from '../controllers/user/session.user.controller'

userRouter.get('/', currentUserController.information)
userRouter.get('/sessions', sessionUserController.findAll)
userRouter.delete('/sessions/:id', sessionUserController.delete)
userRouter.get('/articles', articleUserController.findAll)
userRouter.post(
  '/articles',
  validator(articleDtoSchema),
  articleUserController.create
)
userRouter.put(
  '/articles/:title',
  validator(articleDtoSchema),
  articleUserController.update
)
userRouter.delete('/articles/:title', articleUserController.delete)

export default userRouter
