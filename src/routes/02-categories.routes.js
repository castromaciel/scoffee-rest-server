import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json('GET todo ok')
})

router.get('/:id', (req, res) => {
  res.json('GET una categoria')
})

router.post('/', (req, res) => {
  res.json('POST')
})

router.put('/', (req, res) => {
  res.json('PUT')
})

router.delete('/', (req, res) => {
  res.json('DELETE')
})

export default router
