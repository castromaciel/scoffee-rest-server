import { request, response } from 'express'
import { cryptPassword } from '../helpers/cryptPassword.js'
import { User } from '../models/index.js'

export const getUsers = (req, res) => {
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

  const isEmailExist = await User.findOne({ email })

  if (isEmailExist) {
    return res.status(400).json({
      message: `Email ${email} already exists`
    })
  }
  user.password = cryptPassword(password)

  try {
    await user.save()
    return res.json({
      message: `${username} created successfully`,
      user: {
        name,
        username,
        email
      }
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

export const updateUser = (req, res) => {
  res.json('User updated successfully')
}
