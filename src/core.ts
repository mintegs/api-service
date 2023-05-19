import express from 'express'
import router from './router'

export default class Core {
  /** @define app */
  private readonly app: express.Application

  // Initialize express
  constructor() {
    this.app = express()

    // Import router
    this.app.use('/v1', router)
  }

  getApp(): express.Application {
    return this.app
  }
}
