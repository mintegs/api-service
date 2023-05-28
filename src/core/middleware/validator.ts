import { NextFunction, Response } from 'express'
import { AnyZodObject } from 'zod'
import { CustomRequest } from '../contracts/http'
import { ErrorMessage } from '../lib/errorMessage'

/** Validation data
 * @param schema
 * @package zod
 * @param {anyZodObject} schema
 */
export default (schema: AnyZodObject) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      // Check data with schema
      const { body, query, params } = await schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      // Set data
      req.body = body
      req.query = query
      req.params = params

      return next()
    } catch (error) {
      // Get message
      const message: string =
        error.issues[0].path[1] +
        ' ' +
        error.issues[0].message.replace('String', '')

      // Return error
      next(
        ErrorMessage.setter(
          'Invalid Data',
          message.replace(/\s\s+/g, ' ').toLowerCase(),
          422
        )
      )
    }
  }
