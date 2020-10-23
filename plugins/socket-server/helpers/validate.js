const defaultConfig = require('./default-config')

/* eslint complexity: ["error", 12] */
module.exports = (config) => {
  if (!config) {
    return defaultConfig
  }

  config.server = config.server ? config.server : defaultConfig.server
  config.authorize =
    typeof config.authorize === 'boolean'
      ? config.authorize
      : defaultConfig.authorize

  return config
}
