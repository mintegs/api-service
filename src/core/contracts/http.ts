import { Request } from 'express'

export interface CustomRequest extends Request {
  ipAddress?: string
  device?: device
}

export type device = {
  name: string
  version?: string
}
