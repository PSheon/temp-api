const PROCESS_ENV = require('config')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const i18n = require('i18n')
const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const FileStreamRotator = require('file-stream-rotator')

const setupBanner = require('./utils/setup/banner')
const setupConfigChecker = require('./utils/setup/config-checker')
const setupDirectory = require('./utils/setup/environment-directory')
const setupSocket = require('./utils/setup/socket')
const setupDocker = require('./utils/setup/docker')
const setupMongo = require('./utils/setup/mongo')

const { AppManager } = require('./plugins/app-manager')
const { QueueManager } = require('./plugins/queue-manager')
const { StatusMonitor } = require('./plugins/status-monitor')
// TODO
const { UI: bullBoardUI } = require('bull-board')
// const { echoAppQueue } = require('./plugins/queue-manager/queues')
// const { startApp } = require('./plugins/app-manager')
// const echoAppConnfig = require('./plugins/app-manager/echo-app-config')

const Server = require('http').createServer(app)

/* Setup Banner information */
setupBanner()
/* Setup process environment */
// TODO
setupConfigChecker(PROCESS_ENV)
/* Setup necessary directory */
setupDirectory({ baseDirName: __dirname })
/* Setup Socket server */
const Socket = setupSocket({
  server: Server,
  authorize: PROCESS_ENV.ENABLE_SOCKET_AUTH
})
/* Setup Docker container */
setupDocker()
/* Setup MongoDB connection */
setupMongo()

/* API Status Monitor */
if (PROCESS_ENV.ENABLE_STATUS_MONITOR) {
  StatusMonitor(Socket, PROCESS_ENV.STATUS_MONITOR_CONFIG)
}

/* API DOCS Swagger UI */
if (PROCESS_ENV.ENABLE_SWAGGER_DOCS_UI) {
  app.use(
    PROCESS_ENV.SWAGGER_UI_ROUTE_PATH,
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsdoc({
        swaggerDefinition: PROCESS_ENV.SWAGGER_DEFINITION,
        apis: ['./docs/*.yaml']
      })
    )
  )
}

/* Enable only in development HTTP request logger middleware */
if (process.env.NODE_ENV === 'production' && PROCESS_ENV.ENABLE_LOG_RECORDER) {
  app.use(
    morgan(
      `:remote-addr @:req[Authorization] - [:date[iso]] "HTTP/:http-version :method :url" <:status> :res[content-length] ":referrer" ":user-agent"`,
      {
        skip: (req) =>
          !req.originalUrl.startsWith('/api') &&
          !req.originalUrl.startsWith('/auth'),
        stream: FileStreamRotator.getStream({
          date_format: 'YYYYMMDD', // eslint-disable-line
          filename: path.join(
            path.join(__dirname, 'logs'),
            'access-%DATE%.log'
          ),
          frequency: 'daily',
          verbose: false
        })
      }
    )
  )
} else {
  app.use(morgan('dev'))
}

/* Redis cache enabled by env variable */
if (PROCESS_ENV.ENABLE_REDIS_CACHE) {
  const getExpeditiousCache = require('express-expeditious')
  const cache = getExpeditiousCache({
    namespace: PROCESS_ENV.REDIS_NAMESPACE,
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      host: PROCESS_ENV.REDIS_HOST,
      port: PROCESS_ENV.REDIS_PORT
    })
  })
  app.use(cache)
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
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)

/* Init all other stuff */
app.use(cors())
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(require('./app/routes'))
Server.listen(PROCESS_ENV.API_PORT)

/* Plugins */
AppManager()
// TODO
QueueManager()
app.use('/queue-dashboard', bullBoardUI)
setTimeout(async () => {
  // echoAppQueue.add({ image: 'http://example.com/image1.tiff' })
  // const proc = await startApp('./app-stacks/echo-app.js', echoAppConnfig())
  // console.log('proc, ', proc)
}, 3000)

module.exports = app // for testing
