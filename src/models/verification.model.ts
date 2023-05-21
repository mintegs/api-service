import { model, Schema } from 'mongoose'
import { VerificationDocument } from '../core/contracts/models'

const verificationSchema = new Schema({
  code: {
    required: true,
    type: String,
    unique: true,
  },
  expiryDate: {
    required: true,
    type: Date,
  },
  used: {
    default: false,
    type: Boolean,
  },
  user: {
    ref: 'User',
    required: true,
    type: Schema.Types.ObjectId,
  },
})

// Index fields
verificationSchema.index({ code: 1 })
verificationSchema.index({ expiryDate: -1 })

const Verification = model<VerificationDocument>(
  'Verification',
  verificationSchema
)
export default Verification
