import { Role, User } from '../models/index.js'

export const isValidRole = async (role = '') => {
  const isExist = await Role.findOne({ role })
  if (!isExist) {
    throw new Error(`Role ${role} does not exist`)
  }
}

export const isEmailExist = async (email) => {
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    throw new Error(`Email ${email} already exist`)
  }
}
