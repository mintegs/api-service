import { NextFunction, Response } from 'express'
import BaseController from '../core/contracts/baseController'
import { CustomRequest } from '../core/contracts/http'

class CurrentUserController extends BaseController {
  constructor() {
    super()
  }

  information(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      this.sendResponse(res, 200, req.session.user.toJSON())
    } catch (error) {
      next(error)
    }
  }
}

export default new CurrentUserController()
