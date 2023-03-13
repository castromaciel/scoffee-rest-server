import { request, response } from 'express'
import { cryptPassword } from '../helpers/cryptPassword.js'
import { User } from '../models/index.js'

export const getUsers = (req, res) => {
  const { q: queries, username = '' } = req.query

  res.json({
    message: 'Succes getting users',
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

export const createUser = async (req, res) => {
  const {
    name, username, email, password, role
  } = req.body
  const user = new User({
    name, username, email, password, role
  })

  // Verify email exists

  // Encrypt password
  user.password = cryptPassword(password)

  // Create user

  try {
    await user.save()
    res.json({
      message: `${username} created successfully`,
      user: {
        name,
        username,
        email
      }
    })
  } catch (error) {
    res.json({
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
