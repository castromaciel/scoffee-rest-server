import cors from 'cors'
import express from 'express'

export class Server {
  constructor() {
    this.app = express()
    this.PORT = process.env.PORT || 8080

    this.middlewares()

    this.routes()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.static('public'))

    this.app.use(express.json())
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.json('Obtuviste tu pizza')
    })

    this.app.post('/api', (req, res) => {
      res.json('Pizza pedida')
    })

    this.app.delete('/api', (req, res) => {
      res.json('Eliminaste tu pedido')
    })

    this.app.put('/api', (req, res) => {
      res.json('Pedido editado')
    })
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`listening on port ${this.PORT}`)
    })
  }
}
