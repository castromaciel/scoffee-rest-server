import { request, response } from 'express'
import { Category, User } from '../models/index.js'

export const getCategories = async (req, res) => {
  const { limit = 20, from = 0 } = req.query
  const queryFilter = {
    status: true
  }

  const [total, categories] = await Promise.all([
    Category.count(),
    Category.find(queryFilter)
      .populate('user', ['name', 'username'])
      .skip(Number(from))
      .limit(Number(limit))
  ])

  return res.json({
    headers: {
      status: 'success',
      message: 'Categories retrieved successfully',
      timestamp: new Date().toISOString()
    },
    total,
    categories
  })
}

export const getCategory = async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id)
    .populate('user', ['name', 'username'], User)

  if (!category) {
    return res.status(404).json({
      headers: {
        status: 'error',
        message: 'Category not found'
      },
      categories: []
    })
  }

  return res.json({
    headers: {
      message: 'Categories retrieved successfully',
      timestamp: new Date().toISOString()
    },
    categories: [
      category
    ]
  })
}

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const { _id: uid } = req.user

  const categoryDb = await Category.findOne({ name })
  if (categoryDb) {
    return res.status(400).json({
      headers: {
        status: 'error',
        message: `Category '${name}', already exists`
      }
    })
  }

  const data = {
    name,
    user: uid
  }

  const category = new Category(data)
  category.save()

  return res.status(201).json({
    headers: {
      status: 'success',
      message: `Category '${name}', created successfully`
    }
  })
}

export const updateCategory = async (req, res) => {
  const { id } = req.params
  const {
    _id, status, ...rest
  } = req.body

  const category = await Category.findByIdAndUpdate(id, rest)
    .populate('user', ['name', 'username', 'email'], User)

  return res.status(200).json({
    headers: {
      status: 'success',
      message: `Category '${category.name}', updated successfully`
    },
    categories: [
      category
    ]
  })
}
