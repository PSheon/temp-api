const path = require('path')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

module.exports = () =>
  morgan(
    (tokens, req, res) =>
      [
        tokens['remote-addr'](req, res),
        req.session.user ? req.session.user.email : 'X',
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
        filename: path.join(
          path.join(__dirname, '../../', 'logs'),
          'access-%DATE%.log'
        ),
        frequency: 'daily',
        verbose: false
      })
    }
  )
