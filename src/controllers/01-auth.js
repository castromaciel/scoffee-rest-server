import bcryptjs from 'bcryptjs'
import { request, response } from 'express'
import { ROLES } from '../constants/index.js'
import { generateToken } from '../helpers/generateToken.js'
import { googleVerify } from '../helpers/googleVerify.js'
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
  const { id_token: token } = req.body

  try {
    const { email, name, picture } = await googleVerify(token)

    let user = await User.findOne({ email })

    if (!user) {
      const data = {
        username: name,
        name,
        picture,
        email,
        password: 'asdasd',
        role: ROLES.USER,
        isGoogleAuthent: true
      }

      user = await User(data)
      await user.save()
      return res.json({
        headers: {
          token,
          message: `Token ${token}`,
          timestamp: new Date().toISOString()
        },
        user
      })
    }

    if (!user.status) {
      return res.status(401).json({
        message: 'User blocked'
      })
    }

    const authToken = generateToken(user.id)

    return res.json({
      headers: {
        authToken,
        timestamp: new Date().toISOString()
      },
      user
    })
  } catch (error) {
    return res.status(400).json({
      error
    })
  }
}
