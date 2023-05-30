import { Document, Model } from 'mongoose'
import { device } from './http'

export type Role = undefined | 'ADMIN'
export type Status = 'INACTIVE' | 'ACTIVE' | 'SUSPENDED'

export declare interface Models {
  Session: SessionModel
  User: UserModel
  Verification: VerificationModel
  Category: CategoryModel
}

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

export interface UserDto {
  avatar?: string
  bio?: string
  birthday?: Date
  email: string
  job?: string
  name?: string
  role?: Role
  status?: Status
  username: string
}

export interface SessionDto {
  user: string
  token: string
  ip: string
  device: device
  expireDate: Date
}

export interface SessionDocument extends Document {
  expiryDate: Date
  ip: string
  device: device
  token: string
  user: UserDocument
}

export interface VerificationDocument extends Document {
  code: string
  expiryDate: Date
  used: boolean
  user: UserDocument
}

export interface VerificationDto {
  expiryDate: Date
  user: UserDocument
}

export interface CategoryDocument extends Document {
  title: string
}

export type VerificationModel = Model<VerificationDocument>
export type UserModel = Model<UserDocument>
export type SessionModel = Model<SessionDocument>
export type CategoryModel = Model<CategoryDocument>
