import bcryptjs from 'bcryptjs'
import { request, response } from 'express'
import { generateToken } from '../helpers/generateToken.js'
import { User } from '../models/index.js'

export const login = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user || !user.status) {
      return res.status(400).json({
        message: 'Verifique la información ingresada e intente nuevamente'
      })
    }

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        message: 'Verifique la información ingresada e intente nuevamentse'
      })
    }

    // Generar JWT
    const authToken = await generateToken(user.id)

    return res.json({
      headers: {
        authToken,
        timestamp: new Date().toISOString()
      },
      data: {
        user
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error '
    })
  }
}

export const googleAuth = async (req, res) => {
  const { id_token: authToken } = req.body

  res.json({
    authToken,
    message: `Token ${authToken}`
  })
}
