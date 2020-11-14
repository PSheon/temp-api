const PROCESS_ENV = require('config')

const chalk = require('chalk')
const connectRedis = require('connect-redis')
const session = require('express-session')
const ora = require('ora')
const redis = require('redis')

const redisClient = redis.createClient()
const RedisStore = connectRedis(session)

const RedisSession = (app) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[Redis Session]')} 中...`
  ).start()

  /* @ANCHOR */
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      name: 'user',
      secret: PROCESS_ENV.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 6 * 3600 * 1000, // 6 hours
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development'
      }
    })
  )

  spinner.succeed(`${chalk.yellow('[Redis Session]')} 已啟用`)
}

module.exports = {
  RedisSession
}
