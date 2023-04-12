import { Router } from 'express'
import { search } from '../controllers/search/index.js'

const router = Router()

router.get('/:collection/:term', search)

export default router
