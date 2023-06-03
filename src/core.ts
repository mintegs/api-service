import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import deviceMiddleware from './core/middleware/device.middleware'
import {
  error404,
  errorHandler,
} from './core/middleware/errorHandler.middleware'
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
    this.app.use(cors())
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
    this.app.use(deviceMiddleware)
    this.app.use(ipMiddleware)
    // this.app.use(
    //   morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined')
    // )

    // router
    this.app.use('/', router)

    // Errors management
    this.app.use('*', error404)
    this.app.use(errorHandler)
  }

  getApp(): express.Application {
    return this.app
  }
}
