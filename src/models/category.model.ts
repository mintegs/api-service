import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../core/contracts/models'

const categorySchema = new Schema(
  {
    title: {
      required: true,
      type: String,
      unique: true,
    },
  },
  { autoIndex: true, timestamps: true }
)

const Category = model<CategoryDocument>('Category', categorySchema)

export default Category
