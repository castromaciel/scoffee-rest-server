import { response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Category } from '../../../models/index.js'

const searchCategories = async (term = '', res = response) => {
  if (isValidObjectId(term)) {
    const categories = await Category.findById(term)
      .populate('user', ['name', 'email'])

    return res.json({
      results: {
        categories: categories || []
      }
    })
  }

  const regexp = new RegExp(term, 'i')

  const categories = await Category.find({
    $or: [
      { name: regexp }
    ],
    $and: [
      { status: true }
    ]
  })
    .populate('user', ['name', 'email'])

  return res.json({
    results: {
      categories: categories || []
    }
  })
}

export default searchCategories
