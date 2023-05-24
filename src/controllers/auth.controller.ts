import { NextFunction, Response } from 'express'
import BaseController from '../core/contracts/baseController'
import { CustomRequest } from '../core/contracts/http'
import { UserRepository } from '../core/repositories/user.repository'
import { VerificationRepository } from '../core/repositories/verification.repository'
import AuthService from '../services/auth.service'

class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async signUp(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      await this.authService.signUp(req.body)

      return this.sendResponse(res, 201)
    } catch (error) {
      next(error)
    }
  }

  async signIn(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      await this.authService.signIn(req.body)
      return this.sendResponse(res, 200)
    } catch (error) {
      next(error)
    }
  }

  google(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      return this.sendResponse(res, 200, {
        message: 'login google',
      })
    } catch (error) {
      next(error)
    }
  }

  github(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      return this.sendResponse(res, 200, {
        message: 'login github',
      })
    } catch (error) {
      next(error)
    }
  }

  verifyIdentity(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      return this.sendResponse(res, 200, {
        message: 'verify identity',
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController(
  new AuthService(new UserRepository(), new VerificationRepository())
)
