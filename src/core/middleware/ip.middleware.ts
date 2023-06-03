import { NextFunction, Response } from 'express'
import { CustomRequest } from '../contracts/http'

export default (req: CustomRequest, res: Response, next: NextFunction) => {
  // Get ip address
  const ip = req.headers['x-forwarded-for'] as string

  if (ip && process.env.NODE_ENV === 'production') {
    ip.split(',')[0].replace(',', '')
  }

  // Set ip address in req.ipAddress
  req.ipAddress = ip ?? '127.0.0.1'

  next()
}
