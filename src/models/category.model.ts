import { model, Schema } from 'mongoose'
import { CategoryDocument } from '../core/contracts/models'
import { ErrorMessage } from '../core/lib/errorMessage'

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

categorySchema.post('save', function (error, doc, next) {
  if (error.code === 11000)
    throw ErrorMessage.setter('Invalid Data', 'Title is already', 422)
  else next()
})

const Category = model<CategoryDocument>('Category', categorySchema)

export default Category
