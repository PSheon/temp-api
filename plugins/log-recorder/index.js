const path = require('path')

const chalk = require('chalk')
const FileStreamRotator = require('file-stream-rotator')
const morgan = require('morgan')
const ora = require('ora')

const MorganFileLogRecorder = (app) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[File Log Recorder]')} 中...`
  ).start()

  app.use(
    morgan(
      (tokens, req, res) =>
        [
          tokens['remote-addr'](req, res),
          req.session.user ? req.session.user.email : 'XX',
          tokens.date(req, res, 'iso'),
          tokens.status(req, res),
          `HTTP/${tokens['http-version'](req, res)}`,
          tokens.method(req, res),
          tokens.url(req, res),
          tokens['user-agent'](req, res),
          tokens.res(req, res, 'content-length'),
          `Response ${tokens['response-time'](req, res, 2)}ms`,
          `Total ${tokens['total-time'](req, res, 2)}ms <<<`
        ].join(' <|> '),
      {
        skip: (req) =>
          !req.originalUrl.startsWith('/api') &&
          !req.originalUrl.startsWith('/auth'),
        stream: FileStreamRotator.getStream({
          date_format: 'YYYYMMDD', // eslint-disable-line
          filename: path.resolve(
            __dirname,
            '../../',
            'logs',
            'access-%DATE%.log'
          ),
          frequency: 'daily',
          verbose: false
        })
      }
    )
  )

  spinner.succeed(`${chalk.yellow('[File Log Recorder]')} 已啟用`)
}

const MorganConsoleLogger = (app) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[Console Log Recorder]')} 中...`
  ).start()

  app.use(morgan('dev'))

  spinner.succeed(`${chalk.yellow('[Console Log Recorder]')} 已啟用`)
}

module.exports = {
  MorganFileLogRecorder,
  MorganConsoleLogger
}
