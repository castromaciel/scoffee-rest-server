import bcrypt from 'bcryptjs'

export const cryptPassword = (password) => {
  const salt = bcrypt.genSaltSync()
  return bcrypt.hashSync(password, salt)
}
