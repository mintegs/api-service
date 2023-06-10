import * as express from 'express'
import { Router } from 'express'
const userRouter: Router = express.Router()

// controller
import currentUserController from '../controllers/current.user.controller'
import sessionUserController from '../controllers/user/session.user.controller'

userRouter.get('/', currentUserController.information)
userRouter.get('/sessions', sessionUserController.findAll)
userRouter.delete('/sessions/:id', sessionUserController.delete)

export default userRouter
