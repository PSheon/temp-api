const chalk = require('chalk')
const isPlainObject = require('lodash.isPlainObject')

const isArray = Array.isArray
const typeOf = (obj) =>
  ({}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase())
const propertyFormater = (parent, property) =>
  parent === '' ? property : `${parent}.${property}`

const iterate = (defaultConfig, newConfig, parent = '') => {
  Object.entries(defaultConfig).forEach(([key]) => {
    if (typeOf(defaultConfig[key]) !== typeOf(newConfig[key])) {
      console.log(
        `設定裡的 ${chalk.yellow(
          propertyFormater(parent, key)
        )} 型別錯誤，應為 ${chalk.green(typeOf(defaultConfig[key]))}`
      )
      process.exit(3)
    }

    if (isPlainObject(defaultConfig[key]) && isPlainObject(newConfig[key])) {
      iterate(defaultConfig[key], newConfig[key], propertyFormater(parent, key))
    }
    if (isArray(defaultConfig[key]) && isArray(newConfig[key])) {
      newConfig[key].map((item) => {
        iterate(defaultConfig[key][0], item, propertyFormater(parent, key))
      })
    }
  })
}

module.exports = (config) => {
  const DEFAULT_CONFIG = config.util.getConfigSources()[0].parsed

  iterate(DEFAULT_CONFIG, config)

  return config
}
