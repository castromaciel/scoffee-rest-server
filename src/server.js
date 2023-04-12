import cors from 'cors'
import express from 'express'
import { API_PATHS } from './constants/index.js'
import { dbConnection } from './database/config.js'
import {
  authRoutes, categoriesRoutes, productsRoutes, searchRoutes, usersRoutes
} from './routes/index.js'

export class Server {
  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || 8080
    this.paths = API_PATHS

    this.connectionDb()

    this.middlewares()

    this.routes()
  }

  async connectionDb() {
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.users, usersRoutes)
    this.app.use(this.paths.categories, categoriesRoutes)
    this.app.use(this.paths.products, productsRoutes)
    this.app.use(this.paths.search, searchRoutes)
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Listening on port ${this.PORT}`)
    })
  }
}
