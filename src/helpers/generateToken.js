import jwt from 'jsonwebtoken'

export const generateToken = async (uid = '') => new Promise((resolve, reject) => {
  const payload = { uid }

  jwt.sign(payload, process.env.SECRET, {
    expiresIn: '10min'
  }, (error, token) => {
    if (error) {
      console.log(error)
      reject(new Error('Something wents wrong'))
    }
    resolve(token)
  })
})
