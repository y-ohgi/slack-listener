const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const api = require('./api')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {

  // Import API Routes
  app.use('/api', api)

  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host)

  startSocketIo(server)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

const startSocketIo = (server) => {
  const io = require('socket.io').listen(server)

  io.on('connection', (socket) => {
    consola.info(`id: ${socket.id} is connected!`)

    socket.on('message', (message) => {
      consola.inf(message)
    })
  })

}

start()
