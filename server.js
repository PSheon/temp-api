const PROCESS_ENV = require('config')
const http = require('http')
const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const i18n = require('i18n')
const passport = require('passport')

// TODO
// const { AppManager, startApp } = require('./plugins/app-manager')
// const echoAppConnfig = require('./plugins/app-manager/echo-app-config')
const {
  MorganFileLogRecorder,
  MorganConsoleLogger
} = require('./plugins/log-recorder')
const { QueueManager } = require('./plugins/queue-manager')
const { RedisCache } = require('./plugins/redis-cache')
const { RedisSession } = require('./plugins/redis-session')
const { SocketServer } = require('./plugins/socket-server')
const { StatusMonitor } = require('./plugins/status-monitor')
const { SwaggerDocsUI } = require('./plugins/swagger-docs-ui')
const setupBanner = require('./utils/setup/banner')
const setupConfig = require('./utils/setup/config')
const setupDocker = require('./utils/setup/docker')
const setupDirectory = require('./utils/setup/environment-directory')
const setupMongo = require('./utils/setup/mongo')

const app = express()
const Server = http.createServer(app)

/* --------------------------------------- */
/*              Setup Project              */
/* --------------------------------------- */
/* Setup Banner information */
setupBanner()
/* Setup process environment */
setupConfig()
/* Setup necessary directory */
setupDirectory()
/* Setup Docker container */
setupDocker()
/* Setup MongoDB connection */
setupMongo()

/* --------------------------------------- */
/*           Environment settings          */
/* --------------------------------------- */
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))
app.set('trust proxy', 1)

/* --------------------------------------- */
/*             Plugins Settings            */
/* --------------------------------------- */
const Socket = SocketServer({
  server: Server,
  authorize: PROCESS_ENV.ENABLE_SOCKET_AUTH
})
// AppManager(app)
// TODO
setTimeout(async () => {
  // const proc = await startApp('./app-stacks/echo-app.js', echoAppConnfig())
  // console.log('proc, ', proc)
}, 3000)
QueueManager(app)

/* Security Session */
RedisSession(app)
/* API Status Monitor */
if (PROCESS_ENV.ENABLE_STATUS_MONITOR) {
  StatusMonitor(Socket, PROCESS_ENV.STATUS_MONITOR_CONFIG)
}
/* API DOCS Swagger UI */
if (PROCESS_ENV.ENABLE_SWAGGER_DOCS_UI) {
  SwaggerDocsUI(app)
}
/* Enable only in development HTTP request logger middleware */
if (process.env.NODE_ENV === 'production' && PROCESS_ENV.ENABLE_LOG_RECORDER) {
  MorganFileLogRecorder(app)
} else {
  MorganConsoleLogger(app)
}
/* Redis cache enabled by env variable */
if (PROCESS_ENV.ENABLE_REDIS_CACHE) {
  RedisCache(app)
}
/* for parsing json */
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
/* for parsing application/x-www-form-urlencoded */
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)
/* Internationalization */
i18n.configure({
  locales: ['zh-tw', 'en'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'zh-tw',
  objectNotation: true
})
app.use(i18n.init)

/* Init all other stuff */
app.use(
  cors({
    origin: PROCESS_ENV.FRONTEND_URL,
    credentials: true
  })
)
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.use(require('./app/routes'))
Server.listen(PROCESS_ENV.API_PORT)

module.exports = app // for testing
