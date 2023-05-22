import autoBind from 'auto-bind'
import { Response } from 'express'
import models from '../../models'
import { Models } from './models'

export default abstract class BaseController {
  protected models: Models

  constructor() {
    autoBind(this)

    this.models = { ...models }
  }

  /**
   * @method sendResponse
   * @param {response} res
   * @param {number} status default 200
   * @param {object} data
   * @returns response server
   */
  sendResponse(res: Response, status = 200, data?: object): Response {
    return res.status(status).json(data)
  }
}
