import { Document } from 'mongoose'
import { device } from './http'

export type Role = undefined | 'ADMIN'
export type Status = 'INACTIVE' | 'ACTIVE' | 'SUSPENDED'

export interface UserDocument extends Document {
  avatar?: string
  bio?: string
  birthday?: Date
  email: string
  job?: string
  name?: string
  role: Role
  status: Status
  username: string
  generateSession: (ip: string, device: device) => Promise<string>
}

export interface SessionDocument extends Document {
  expiryDate: Date
  ip: string
  device: device
  token: string
  user: UserDocument
}
