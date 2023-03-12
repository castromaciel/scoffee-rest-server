import { request, response } from 'express'

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

export const createUser = (req, res) => {
  const data = req.body

  res.json({
    message: `${data.username} created successfully`
  })
}

export const deleteUser = (req, res) => {
  res.json('User deleted successfully')
}

export const updateUser = (req, res) => {
  res.json('User updated successfully')
}
