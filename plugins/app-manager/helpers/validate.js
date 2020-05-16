const defaultConfig = require('./default-config')

/* eslint complexity: ["error", 12] */
module.exports = (config) => {
  if (!config) {
    return defaultConfig
  }

  config.name =
    typeof config.name === 'string' ? config.name : defaultConfig.name
  // eslint-disable-next-line
  config.exec_mode = ['cluster', 'fork'].includes(config.exec_mode)
    ? config.exec_mode
    : defaultConfig.exec_mode
  config.instances =
    typeof config.instances === 'number'
      ? config.instances
      : defaultConfig.instances
  // eslint-disable-next-line
  config.max_memory_restart = ['100M', '50M'].includes(
    config.max_memory_restart
  )
    ? config.max_memory_restart
    : defaultConfig.max_memory_restart

  return config
}
