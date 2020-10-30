const PROCESS_ENV = require('config')

const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')

const redisClient = redis.createClient()

const RedisSession = (app) => {
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: PROCESS_ENV.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 6 * 3600 * 1000, // 6 hours
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development'
      }
    })
  )
}

module.exports = {
  RedisSession
}
