import { Router } from 'express'
import { check } from 'express-validator'
import { ROLES } from '../constants/index.js'
import {
  createCategory, deleteCategory, getCategories, getCategory, updateCategory
} from '../controllers/02-categories.js'
import { existCategory, isCategoryIdExist } from '../database/db-validators.js'
import { hasRoles, validateFields, validateToken } from '../middlewares/index.js'

const router = Router()

router.get('/', getCategories)

router.get(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isCategoryIdExist),
    validateFields
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
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('name').custom(existCategory),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isCategoryIdExist),
    validateFields
  ],
  updateCategory
)

router.delete(
  '/:id',
  [
    validateToken,
    hasRoles(ROLES.ADMIN),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isCategoryIdExist)
  ],
  deleteCategory
)

export default router
