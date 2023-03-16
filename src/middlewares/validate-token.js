import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
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
    req.uid = uid

    return next()
  } catch (error) {
    return res.status(401).json({
      headers: {
        authToken: null,
        timestamp: new Date().toISOString()
      }
    })
  }
}
