import {
  Category, Product, Role, User
} from '../models/index.js'

export const isValidRole = async (role = '') => {
  const isExist = await Role.findOne({ role })

  if (!isExist) {
    throw new Error(`Role ${role} does not exist`)
  }
}

export const isEmailExist = async (email) => {
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    throw new Error(`Email ${email} already exist`)
  }
}

export const isUserIdExist = async (id) => {
  const userId = await User.findById(id)

  if (!userId) {
    throw new Error(`User ${id} does not exist`)
  }
}

export const existCategory = async (name) => {
  const category = await Category.findOne({ name })

  if (category) {
    throw new Error(`Category ${name} already exist`)
  }
}

export const isCategoryIdExist = async (id) => {
  const categoryId = await Category.findById(id)

  if (!categoryId) {
    throw new Error(`Category ${id} does not exist`)
  }
}

export const existProduct = async (name) => {
  const product = await Product.findOne({ name })

  if (product) {
    throw new Error(`Product ${name} already exist`)
  }
}

export const isProductIdExist = async (id) => {
  const productId = await Product.findById(id)

  if (!productId) {
    throw new Error(`Product ${id} does not exist`)
  }
}
