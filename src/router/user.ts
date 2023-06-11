import * as express from 'express'
import { Router } from 'express'
const userRouter: Router = express.Router()

// controller
import currentUserController from '../controllers/current.user.controller'
import articleUserController from '../controllers/user/article.user.controller'
import sessionUserController from '../controllers/user/session.user.controller'

userRouter.get('/', currentUserController.information)
userRouter.get('/sessions', sessionUserController.findAll)
userRouter.delete('/sessions/:id', sessionUserController.delete)
userRouter.get('/articles', articleUserController.findAll)
userRouter.post('/articles', articleUserController.create)
userRouter.put('/articles/:id', articleUserController.update)
userRouter.delete('/articles/:id', articleUserController.delete)

export default userRouter
