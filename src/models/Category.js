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

export default model('Category', CategorySchema)
