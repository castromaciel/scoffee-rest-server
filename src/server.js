import cors from 'cors'
import express from 'express'
import { usersRoutes } from './routes/index.js'

export class Server {
  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || 8080
    this.paths = {
      users: '/api/users'
    }

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.paths.users, usersRoutes)
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`listening on port ${this.PORT}`)
    })
  }
}
