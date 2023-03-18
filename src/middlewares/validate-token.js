import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const validateToken = async (req, res, next) => {
  const token = req.header('authToken')

  if (!token) {
    return res.status(401).json({
      headers: {
        authToken: null,
        timestamp: new Date().toISOString()
      }
    })
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(uid)

    if (!user) {
      return res.status(401).json({
        headers: {
          authToken: null,
          timestamp: new Date().toISOString(),
          message: 'Unauthorized access'
        }
      })
    }

    if (!user.status) {
      return res.status(401).json({
        headers: {
          authToken: null,
          timestamp: new Date().toISOString(),
          message: 'Unauthorized access'
        }
      })
    }

    req.user = user

    return next()
  } catch (error) {
    return res.status(401).json({
      headers: {
        authToken: null,
        timestamp: new Date().toISOString(),
        message: 'Unauthorized access'
      }
    })
  }
}
