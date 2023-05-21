import { model, Schema } from 'mongoose'
import { SessionDocument } from '../core/contracts/models'

const sessionSchema = new Schema(
  {
    device: {
      required: true,
      type: Object,
    },
    expiryDate: {
      required: true,
      type: Date,
    },
    ip: {
      required: true,
      type: String,
    },
    token: {
      required: true,
      type: String,
      unique: true,
    },
    user: {
      ref: 'User',
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  { autoIndex: true, timestamps: true }
)

const Session = model<SessionDocument>('Session', sessionSchema)

export default Session
