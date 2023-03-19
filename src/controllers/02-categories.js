import { request, response } from 'express'
import { Category } from '../models/index.js'

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase()
  const { _id: uid } = req.user

  const categoryDb = await Category.findOne({ name })
  if (categoryDb) {
    return res.status(400).json({
      headers: {
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
      message: `Category '${name}', created successfully`
    }
  })
}
