import express from 'express'

export default class Core {
  /** @define app */
  private readonly app: express.Application

  // Initialize express
  constructor() {
    this.app = express()
  }

  getApp(): express.Application {
    return this.app
  }
}
