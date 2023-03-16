import bcryptjs from 'bcryptjs'
import { request, response } from 'express'
import { User } from '../models/index.js'

export const login = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    // Verificar si el email existe y estado del usuario
    const user = await User.findOne({ email })

    if (!user || !user.status) {
      return res.status(400).json({
        message: 'Verifique la información ingresada e intente nuevamente'
      })
    }

    // Verificar la clave
    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({
        message: 'Verifique la información ingresada e intente nuevamentse'
      })
    }

    // Generar JWT

    return res.json({
      message: 'Authenticated'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error '
    })
  }
}
