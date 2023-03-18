import { ROLES } from '../constants/index.js'

export const validateRole = (req, res, next) => {
  const authToken = req.header('authToken')

  if (!req.user) {
    return res.statusCode(500).json({
      headers: {
        message: 'Internal Server Error',
        authToken
      }
    })
  }

  const { role } = req.user

  if (role !== ROLES.ADMIN) {
    return res.status(401).json({
      headers: {
        message: 'You are not allowed to access ',
        authToken
      }
    })
  }

  return next()
}

export const hasRoles = (...roles) => (req, res, next) => {
  const authToken = req.header('authToken')
  if (!req.user) {
    return res.statusCode(500).json({
      headers: {
        message: 'Internal Server Error',
        authToken
      }
    })
  }

  if (!roles.includes(req.user.role)) {
    return res.status(401).json({
      headers: {
        message: 'You are not allowed to access ',
        authToken
      }
    })
  }

  return next()
}
