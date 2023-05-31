import { NextFunction, Response } from 'express'
import { CustomRequest } from '../contracts/http'
import { Role } from '../contracts/models'
import { ErrorMessage } from '../lib/errorMessage'

export default (role: Role) => {
  return ({ session }: CustomRequest, res: Response, next: NextFunction) => {
    if (session.user.role === role) {
      return next()
    }

    // Otherwise return error
    throw ErrorMessage.setter('Access denied', 'Authentication failed', 403)
  }
}
