const PROCESS_ENV = require('config')

const getExpeditiousCache = require('express-expeditious')
const engine = require('expeditious-engine-redis')({
  host: PROCESS_ENV.REDIS_HOST,
  port: PROCESS_ENV.REDIS_PORT
})

const RedisCache = (app) => {
  const cache = getExpeditiousCache({
    namespace: PROCESS_ENV.REDIS_NAMESPACE,
    defaultTtl: '1 minute',
    engine
  })
  app.use(cache)
}

module.exports = {
  RedisCache
}
