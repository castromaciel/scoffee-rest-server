import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name must be provided']
  },
  username: {
    type: String,
    required: [true, 'Username must be provided']
  },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password must be provided']
  },
  role: {
    type: String,
    required: [true, 'Role must be provided'],
    enum: ['ADMIN', 'USER']
  },
  img: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  isGoogleAuthent: {
    type: Boolean,
    default: false
  }
})

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

export default model('User', UserSchema)
