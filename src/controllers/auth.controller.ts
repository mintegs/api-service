import { NextFunction, Response } from 'express'
import BaseController from '../core/contracts/baseController'
import { CustomRequest } from '../core/contracts/http'
import { UserRepository } from '../core/repositories/user.repository'
import { VerificationRepository } from '../core/repositories/verification.repository'
import { cookieOption } from '../core/utilities/cookie'
import AuthService from '../services/auth.service'

class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super()
  }

  private setCookie(
    res: Response,
    token: string | null,
    maxAge: number = 31 * 24 * 60 * 60 * 1000
  ) {
    res.cookie('mintegs_token', token, {
      ...cookieOption,
      maxAge,
    })
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

  async google(
    { query: { code }, ipAddress, device }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const jwtToken = await this.authService.google({
        code: code as string,
        ipAddress: ipAddress ?? '',
        device: device ?? { name: 'unknown' },
      })

      this.setCookie(res, jwtToken)

      return res.redirect(302, `https://${process.env.DOMAIN}`)
    } catch (error) {
      next(error)
    }
  }

  async github(
    { query: { code }, ipAddress, device }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const jwtToken = await this.authService.github({
        code: code as string,
        ipAddress: ipAddress ?? '',
        device: device ?? { name: 'unknown' },
      })

      this.setCookie(res, jwtToken)

      return res.redirect(302, `https://${process.env.DOMAIN}`)
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
