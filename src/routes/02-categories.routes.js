import { Router } from 'express'
import { check } from 'express-validator'
import { ROLES } from '../constants/index.js'
import { createCategory } from '../controllers/02-categories.js'
import { hasRoles, validateFields, validateToken } from '../middlewares/index.js'

const router = Router()

router.get('/', (req, res) => {
  res.json('GET todo ok')
})

router.get('/:id', (req, res) => {
  res.json('GET una categoria')
})

router.post('/', [
  validateToken,
  check('name', 'Name is required').not().isEmpty(),
  validateFields
], createCategory)

router.put('/', (req, res) => {
  res.json('PUT')
})

router.delete('/', (req, res) => {
  res.json('DELETE')
})

export default router
