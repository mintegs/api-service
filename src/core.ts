import express from 'express'
import deviceMiddleware from './core/middleware/device.middleware'
import ipMiddleware from './core/middleware/ip.middleware'
import router from './router'

export default class Core {
  /** @define app */
  private readonly app: express.Application

  // Initialize express
  constructor() {
    this.app = express()

    /** Setup and using packages
     * @private
     * @package cors, compression, helmet, body-parser, morgan
     */
    this.app.use(deviceMiddleware)
    this.app.use(ipMiddleware)

    // Import router
    this.app.use('/', router)
  }

  getApp(): express.Application {
    return this.app
  }
}
