const chalk = require('chalk')
const isPlainObject = require('lodash.isPlainObject')

const iterate = (defaultConfig, newConfig) => {
  Object.entries(defaultConfig).forEach(([key]) => {
    if (isPlainObject(defaultConfig[key]) && isPlainObject(newConfig[key])) {
      iterate(defaultConfig[key], newConfig[key])
    }

    if (typeof defaultConfig[key] !== typeof newConfig[key]) {
      console.log(
        `設定的 ${chalk.yellow(key)} 型別錯誤，應為 ${chalk.green(
          typeof defaultConfig[key]
        )}`
      )
      process.exit(1)
    }
  })
}

module.exports = (config) => {
  const DEFAULT_CONFIG = config.util.getConfigSources()[0].parsed

  iterate(DEFAULT_CONFIG, config)

  return config
}
