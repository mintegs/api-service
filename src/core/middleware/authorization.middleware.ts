import { NextFunction, Response } from 'express'
import { CustomRequest } from '../contracts/http'
import { ErrorMessage } from '../lib/errorMessage'
import sessionRepository from '../repositories/session.repository'
import { verifyToken } from '../utilities/jwt'

export default async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get jwt token from headers.authorization or cookies.mintegs_token
    const token =
      (req.headers?.authorization as string) ||
      (req.cookies?.mintegs_token as string)

    // If exists token, handle it
    if (token) {
      // Verify token
      const { id } = verifyToken(token)

      // Find session in mongodb with jwt token and user.id and populate user collection
      const session = await sessionRepository.findWithPopulate(id, token)

      // If exists, handle it
      if (session) {
        // If user status is suspended
        if (session.user.status === 'SUSPENDED') {
          throw ErrorMessage.setter(
            'Account status',
            'Your account is suspended see support for reviewing your account',
            403
          )
        }

        // Set user to req.session and return next
        req.session = session
        return next()
      }
    }

    return res.end()
  } catch (error) {
    return res.end()
  }
}
