import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ErrorMessage, PublicErrorMessage } from '../lib/errorMessage'

export const errorHandler: ErrorRequestHandler = (
  error: ErrorMessage,
  _req,
  res: Response,
  _next
) => {
  if (process.env.NODE_ENV !== 'production') {
    res.status(error.status ? error.status : 500).json({
      message: error.message,
      stack: error.stack,
    })
  } else {
    PublicErrorMessage.setter(error)
    res
      .status(error.status ? error.status : 500)
      .json(PublicErrorMessage.getInstance().withOutStatus)
  }
}

export const error404 = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV !== 'production')
      throw PublicErrorMessage.setter(ErrorMessage.notFound())

    return res.redirect(301, `https://${process.env.DOMAIN}/404`)
  } catch (error) {
    next(error)
  }
}
