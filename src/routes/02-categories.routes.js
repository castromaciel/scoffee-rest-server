import { Router } from 'express'
import { check } from 'express-validator'
import {
  createCategory, getCategories, getCategory, updateCategory
} from '../controllers/02-categories.js'
import { existCategory, isCategoryIdExist } from '../database/db-validators.js'
import { validateFields, validateToken } from '../middlewares/index.js'

const router = Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId()
  ],
  getCategory
)

router.post(
  '/',
  [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(existCategory),
    validateFields
  ],
  createCategory
)

router.put(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isCategoryIdExist)
  ],
  updateCategory
)

router.delete('/', (req, res) => {
  res.json('DELETE')
})

export default router
