import { NextFunction, Response } from 'express'
import BaseController from '../../core/contracts/baseController'
import { CustomRequest } from '../../core/contracts/http'
import { SessionRepository } from '../../core/repositories/session.repository'
import SessionUserService from '../../services/user/session.user.service'

class SessionUserController extends BaseController {
  constructor(private readonly sessionUserService: SessionUserService) {
    super()
  }

  async findAll({ session }: CustomRequest, res: Response, next: NextFunction) {
    try {
      const sessions = await this.sessionUserService.findAll(session.user.id)
      return this.sendResponse(res, 200, { sessions })
    } catch (error) {
      next(error)
    }
  }

  async delete(
    { params: { id }, session }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.sessionUserService.delete(id, session.user.id)
      return this.sendResponse(res, 200)
    } catch (error) {
      next(error)
    }
  }
}

export default new SessionUserController(
  new SessionUserService(new SessionRepository())
)
