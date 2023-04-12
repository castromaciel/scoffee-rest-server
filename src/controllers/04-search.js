/* eslint-disable consistent-return */
import { request, response } from 'express'
import { isValidObjectId } from 'mongoose'
import { User } from '../models/index.js'

const availableCollections = [
  'users',
  'categories',
  'products'
]

const searchUsers = async (term = '', res = response) => {
  if (isValidObjectId(term)) {
    const users = await User.findById(term)

    return res.json({
      results: {
        users: users || []
      }
    })
  }

  const regexp = new RegExp(term, 'i')

  const users = await User.find({
    $or: [
      { name: regexp },
      { email: regexp },
      { username: regexp }
    ],
    $and: [
      { status: true }
    ]
  })

  return res.json({
    results: {
      users: users || []
    }
  })
}

export const search = async (req = request, res = response) => {
  const { collection, term } = req.params

  if (!availableCollections.includes(collection)) {
    return res.status(400).json({
      message: `${collection} not available`
    })
  }

  switch (collection) {
    case 'users':
      await searchUsers(term, res)
      break

    case 'categories':
      return res.json({
        collection,
        term,
        message: 'Search..'
      })

    case 'products':
      return res.json({
        collection,
        term,
        message: 'Search..'
      })

    default:
      return res.status(500).json({
        message: 'Search is not available'
      })
  }
}
