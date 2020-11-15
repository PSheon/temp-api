const fs = require('fs')

const express = require('express')

const router = express.Router()

const { saveUserAccess } = require('../middleware/logger')
const { getMethod, removeExtensionFromFile } = require('../middleware/utils')
const routesPath = `${__dirname}/`

/*
 * Log all requests
 */
router.use('*', async (req, res, next) => {
  if (getMethod(req)) {
    await saveUserAccess(req)
  }

  next()
})

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use('/auth', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
    ? router.use(`/api/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    msg: 'URL_NOT_FOUND'
  })
})

module.exports = router
