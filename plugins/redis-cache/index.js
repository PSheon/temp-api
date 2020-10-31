const PROCESS_ENV = require('config')

const ora = require('ora')
const chalk = require('chalk')
const getExpeditiousCache = require('express-expeditious')
const engine = require('expeditious-engine-redis')({
  host: PROCESS_ENV.REDIS_HOST,
  port: PROCESS_ENV.REDIS_PORT
})

const RedisCache = (app) => {
  const spinner = new ora(`設定 ${chalk.yellow('[Redis Cache]')} 中...`).start()

  const cache = getExpeditiousCache({
    namespace: PROCESS_ENV.REDIS_NAMESPACE,
    defaultTtl: '1 minute',
    engine
  })
  app.use(cache)

  spinner.succeed(`${chalk.yellow('[Redis Cache]')} 已啟用`)
}

module.exports = {
  RedisCache
}
