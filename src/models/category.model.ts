import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../core/contracts/models'

const categorySchema = new Schema(
  {
    title: {
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

const Category = model<CategoryDocument>('Category', categorySchema)

export default Category
