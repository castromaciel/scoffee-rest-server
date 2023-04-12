import { response } from 'express'
import { isValidObjectId } from 'mongoose'
import { Product } from '../../../models/index.js'

const searchProducts = async (term = '', res = response) => {
  if (isValidObjectId(term)) {
    const products = await Product.findById(term)
      .populate('user', ['name', 'email'])
      .populate('category', ['name'])

    return res.json({
      results: {
        products: products || []
      }
    })
  }

  const regexp = new RegExp(term, 'i')

  const products = await Product.find({
    $or: [
      { name: regexp }
    ],
    $and: [
      { status: true }
    ]
  })
    .populate('user', ['name', 'email'])
    .populate('category', ['name'])

  return res.json({
    results: {
      products: products || []
    }
  })
}

export default searchProducts
