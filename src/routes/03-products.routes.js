import { Router } from 'express'
import { check } from 'express-validator'
import { ROLES } from '../constants/index.js'
import {
  createProduct, deleteProduct, getProduct, getProducts, updateProduct
} from '../controllers/03-products.js'
import { isCategoryIdExist, isProductIdExist } from '../database/db-validators.js'
import { hasRoles, validateFields, validateToken } from '../middlewares/index.js'

const router = Router()

router.get('/', getProducts)

router.get(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isProductIdExist),
    validateFields
  ],
  getProduct
)

router.post(
  '/',
  [
    validateToken,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Id is not valid').isMongoId(),
    check('category').custom(isCategoryIdExist),
    validateFields
  ],
  createProduct
)

router.put(
  '/:id',
  [
    validateToken,
    // check('category', 'Id is not valid').isMongoId(),
    check('id').custom(isProductIdExist),
    validateFields
  ],
  updateProduct
)

router.delete(
  '/:id',
  [
    validateToken,
    hasRoles(ROLES.ADMIN),
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isProductIdExist)
  ],
  deleteProduct
)

export default router
