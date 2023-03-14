import { Role } from '../models/index.js'

export const isValidRole = async (role = '') => {
  const isExist = await Role.findOne({ role })
  if (!isExist) {
    throw new Error(`Role ${role} does not exist`)
  }
}
