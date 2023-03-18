import { Router } from 'express'
import { check } from 'express-validator'
import { googleAuth, login } from '../controllers/01-auth.js'
import { validateFields } from '../middlewares/validate-fields.js'

const router = Router()

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

router.post('/google', [
  check('id_token', 'Google auth token is required').not().isEmpty(),
  validateFields
], googleAuth)

export default router
