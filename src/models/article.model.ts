import mongoose, { Schema } from 'mongoose'
import { ArticleDocument } from '../core/contracts/models'
import { ErrorMessage } from '../core/lib/errorMessage'

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

articleSchema.post('save', function (error, doc, next) {
  if (error.code === 11000)
    throw ErrorMessage.setter('Invalid Data', 'Title is already', 422)
  else next()
})

const Article = mongoose.model<ArticleDocument>('Article', articleSchema)

export default Article
