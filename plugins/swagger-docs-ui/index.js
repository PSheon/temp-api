const PROCESS_ENV = require('config')

const chalk = require('chalk')
const ora = require('ora')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const SwaggerDocsUI = (app) => {
  const spinner = new ora(
    `設定 ${chalk.yellow('[Swagger Dosc UI]')} 中...`
  ).start()

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

  spinner.succeed(`${chalk.yellow('[Swagger Dosc UI]')} 已啟用`)
}

module.exports = {
  SwaggerDocsUI
}
