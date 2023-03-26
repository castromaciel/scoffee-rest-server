import { model, Schema } from 'mongoose'

const Product = new Schema({
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
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
})

Product.methods.toJSON = function () {
  const {
    __v, status, _id, ...category
  } = this.toObject()

  category.id = _id
  return category
}

export default model('Product', Product)
