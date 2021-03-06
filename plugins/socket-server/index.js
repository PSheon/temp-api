const PROCESS_ENV = require('config')

const chalk = require('chalk')
const jwt = require('jsonwebtoken')
const ora = require('ora')
const socketIo = require('socket.io')

// const auth = require('../../app/middleware/auth/d-ori')
const User = require('../../app/models/user')

const { validateConfig } = require('./helpers')

const SocketServer = (config) => {
  const spinner = new ora('檢查即時連線...').start()
  const validatedConfig = validateConfig(config)
  const io = socketIo(validatedConfig.server)

  if (validatedConfig.authorize) {
    io.use((socket, next) => {
      const token = socket.handshake.query.token
      // @ANCHOR
      // const JWT_TOKEN = auth.decrypt(token)
      const JWT_TOKEN = token

      jwt.verify(JWT_TOKEN, PROCESS_ENV.JWT_SECRET, (jwtError, payload) => {
        if (jwtError) {
          return next(
            new Error('[Authentication error] socket jwt token error.')
          )
        }

        // eslint-disable-next-line
        User.findById(payload.data._id, (userError, user) => {
          if (userError) {
            return next(
              new Error('[Authentication error] socket user not found.')
            )
          }

          return next()
        })

        return next()
      })
    })
  }

  spinner.succeed(`${chalk.green('[即時連線]')} 已開啟`)
  return io
}

module.exports = {
  SocketServer
}
