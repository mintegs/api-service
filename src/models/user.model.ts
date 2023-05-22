import { model, Schema } from 'mongoose'
import { device } from '../core/contracts/http'
import { UserDocument } from '../core/contracts/models'
import { signToken } from '../core/utilities/jwt'
import Session from './session.model'

const userSchema = new Schema(
  {
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    job: {
      type: String,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      default: 'INACTIVE',
      type: String,
    },
    username: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    socials: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        // Update fields
        ret.birthday = ret.birthday
          ? ret.birthday.toISOString().slice(0, 10)
          : ret.birthday
        ret.joined = ret?.createdAt?.toISOString().slice(0, 10)
        ret.updated = ret?.updatedAt?.toISOString().slice(0, 10)

        // Delete fields from json
        delete ret._id
        delete ret.__v
        delete ret.createdAt
        delete ret.updatedAt
      },
    },
  }
)

// Index fields
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ createdAt: -1 })

/** Create session if user login is successful and return jwt token
 * @param {string} ip
 * @param {object} device
 * @return {string} token
 */
userSchema.methods.generateSession = async function (
  ip: string,
  device: device
) {
  // Generate jwt token
  const token = signToken({
    id: this.id,
    iss: 'mintegs',
  })

  // Create new session
  await new Session({
    device,
    expiryDate: new Date(new Date().setMilliseconds(31 * 24 * 60 * 60 * 1000)),
    ip,
    token,
    user: this.id,
  }).save()

  // Return jwt token
  return token
}

// userSchema.plugin(paginate)

const User = model<UserDocument>('User', userSchema)

export default User
