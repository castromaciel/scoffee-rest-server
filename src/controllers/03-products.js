import { todayISOString } from '../helpers/helpers.js'
import { Product } from '../models/index.js'

export const getProducts = async (req, res) => {
  const { limit = 20, from = 0 } = req.query
  const queryFilter = {
    status: true
  }

  const [total, products] = await Promise.all([
    Product.count(),
    Product.find(queryFilter)
      .skip(Number(from))
      .limit(Number(limit))
      .populate('user', ['name', 'email'])
      .populate('category', ['name'])
  ])

  return res.json({
    headers: {
      status: 'success',
      message: 'Products retrieved successfully',
      timestamp: todayISOString()
    },
    total,
    products
  })
}

export const getProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findById(id)
    .populate('user', ['name', 'email'])
    .populate('category', ['name'])

  if (!product) {
    return res.status(404).json({
      headers: {
        status: 'error',
        message: 'Product not found'
      },
      categories: []
    })
  }

  return res.status(404).json({
    headers: {
      status: 'success',
      message: 'Product retrieved successfully'
    },
    products: [
      product
    ]
  })
}

export const createProduct = async (req, res) => {
  const { status, user, ...body } = req.body
  const name = body.name.toUpperCase()

  const productDb = await Product.findOne({ name })

  if (productDb) {
    return res.status(400).json({
      headers: {
        status: 'error',
        message: `Product '${body.name}', already exists`
      }
    })
  }
  const { _id: uid } = req.user

  const data = {
    ...body,
    name,
    user: uid
  }

  const product = new Product(data)
  product.save()

  return res.status(201).json({
    headers: {
      status: 'success',
      message: `Product '${body.name}', created successfully`
    },
    product
  })
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const {
    _id, status, user, ...data
  } = req.body

  const { _id: uid } = req.user

  if (data.name) {
    data.name = data.name.toUpperCase()
  }

  data.user = uid

  const product = await Product.findByIdAndUpdate(id, data, { new: true })
    .populate('user', ['name', 'username', 'email'])

  return res.status(200).json({
    headers: {
      status: 'success',
      message: `Product '${product.name}', updated successfully`
    },
    product
  })
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  const product = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

  return res.status(200).json({
    headers: {
      status: 'success',
      message: `Product '${product.name}', deleted successfully`
    },
    categories: [
      product
    ]
  })
}
