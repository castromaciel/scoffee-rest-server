import { request, response } from 'express'
import { cryptPassword } from '../helpers/cryptPassword.js'
import { User } from '../models/index.js'

export const getUsers = (req = request, res = response) => {
  const { q: queries, username = '' } = req.query

  res.json({
    message: 'Success getting users',
    queries,
    username
  })
}

export const getUser = (req = request, res = response) => {
  const { id } = req.params
  res.json({
    message: `Succes getting user with id: ${id}`
  })
}

export const createUser = async (req = request, res = response) => {
  const {
    name, username, email, password, role
  } = req.body

  const user = new User({
    name, username, email, password, role
  })

  user.password = cryptPassword(password)

  try {
    await user.save()
    return res.json({
      message: `${username} created successfully`,
      user
    })
  } catch (error) {
    return res.json({
      error
    })
  }
}

export const deleteUser = (req, res) => {
  res.json('User deleted successfully')
}

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params
  const {
    password, isGoogleAuthent, email, ...rest
  } = req.body

  // validate id with db

  if (password) {
    rest.password = cryptPassword(password)
  }
  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    message: 'User updated successfully',
    user
  })
}
