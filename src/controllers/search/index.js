/* eslint-disable consistent-return */
import { request, response } from 'express'
import { availableCollections } from './constants/index.js'
import { searchCategories, searchProducts, searchUsers } from './helpers/index.js'

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
      await searchCategories(term, res)
      break

    case 'products':
      await searchProducts(term, res)
      break

    default:
      return res.status(500).json({
        message: 'Search is not available'
      })
  }
}
