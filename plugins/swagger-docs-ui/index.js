const PROCESS_ENV = require('config')

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const SwaggerDocsUI = (app) => {
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

module.exports = {
  SwaggerDocsUI
}
