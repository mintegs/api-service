import { Request } from 'express'
import { SessionDocument } from './models'

export interface CustomRequest extends Request {
  ipAddress?: string
  device?: device
  session?: SessionDocument
}

export type device = {
  name: string
  version?: string
}
