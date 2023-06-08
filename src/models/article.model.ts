import mongoose, { Schema } from 'mongoose'
import { ArticleDocument } from '../core/contracts/models'

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    summery: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'INACTIVE',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    autoIndex: true,
    timestamps: true,
  }
)

module.exports = mongoose.model<ArticleDocument>('Article', articleSchema)
