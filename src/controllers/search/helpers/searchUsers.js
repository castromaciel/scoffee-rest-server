import { response } from 'express'
import { isValidObjectId } from 'mongoose'
import { User } from '../../../models/index.js'

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

export default searchUsers
