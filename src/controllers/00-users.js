import { request, response } from 'express'
import { cryptPassword } from '../helpers/cryptPassword.js'
import { User } from '../models/index.js'

export const getUsers = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query
  const queryFilter = {
    status: true
  }

  const [users, total] = await Promise.all([
    User.countDocuments(queryFilter),
    User.find(queryFilter)
      .limit(Number(limit))
      .skip(Number(from))
  ])

  res.json({
    message: 'Success getting users',
    total,
    users
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

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params

  await User.findByIdAndUpdate(id, { status: false })

  res.json({
    message: 'User deleted successfully'
  })
}

export const updateUser = async (req = request, res = response) => {
  const { id } = req.params
  const {
    _id, password, isGoogleAuthent, email, ...rest
  } = req.body

  if (password) {
    rest.password = cryptPassword(password)
  }
  const user = await User.findByIdAndUpdate(id, rest)

  res.json({
    message: 'User updated successfully',
    user
  })
}
