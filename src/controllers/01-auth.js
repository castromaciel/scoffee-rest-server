import { response } from 'express'

export const login = (req, res = response) => {
  res.json({
    message: 'Authenticated'
  })
}
