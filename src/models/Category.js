import { model, Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is requireds'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'Status is required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  }
})

CategorySchema.methods.toJSON = function () {
  const {
    __v, status, _id, ...category
  } = this.toObject()

  category.id = _id
  return category
}

export default model('Category', CategorySchema)
