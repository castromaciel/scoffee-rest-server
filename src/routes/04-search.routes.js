import { Router } from 'express'
import { search } from '../controllers/04-search.js'

const router = Router()

router.get('/:collection/:term', search)

export default router
