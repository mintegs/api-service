import { Document } from 'mongoose'

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
  generateSession: (ip: string, os: any) => Promise<string>
}
