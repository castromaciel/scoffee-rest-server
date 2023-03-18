import { Router } from 'express'
import { check } from 'express-validator'
import {
  createUser, deleteUser, getUser, getUsers, updateUser
} from '../controllers/00-users.js'
import { isEmailExist, isUserIdExist, isValidRole } from '../database/db-validators.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateRole } from '../middlewares/validate-roles.js'
import { validateToken } from '../middlewares/validate-token.js'

const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(isEmailExist),
    // check('role', 'Role is not valid').isIn(['ADMIN', 'USER']),
    check('role').custom(isValidRole),
    validateFields
  ],
  createUser
)
router.put(
  '/:id',
  [
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isUserIdExist),
    check('role').custom(isValidRole),
    validateFields
  ],
  updateUser
)

router.delete(
  '/:id',
  [
    validateToken,
    validateRole,
    check('id', 'Id is not valid').isMongoId(),
    check('id').custom(isUserIdExist),
    validateFields
  ],
  deleteUser
)

export default router
