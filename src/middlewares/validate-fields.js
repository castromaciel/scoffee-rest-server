import { validationResult } from 'express-validator'

export const validateFields = (req, res, next) => {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    const { errors } = validationErrors
    return res.status(400).json({
      errors
    })
  }
  return next()
}
