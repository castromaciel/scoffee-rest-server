import { Router } from 'express'
import {
  createUser, deleteUser, getUser, getUsers, updateUser
} from '../controllers/index.js'

const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

export default router
