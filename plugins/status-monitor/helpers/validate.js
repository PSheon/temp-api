const defaultConfig = require('./default-config')

module.exports = (config) => {
  if (!config) {
    return defaultConfig
  }

  const mergeChartVisibility = (configChartVisibility) => {
    Object.keys(defaultConfig.chartVisibility).forEach((key) => {
      if (configChartVisibility[key] === false) {
        defaultConfig.chartVisibility[key] = false
      }
    })
    return defaultConfig.chartVisibility
  }

  config.path =
    typeof config.path === 'string' ? config.path : defaultConfig.path
  config.socketPath =
    typeof config.socketPath === 'string'
      ? config.socketPath
      : defaultConfig.socketPath
  config.spans =
    typeof config.spans === 'object' ? config.spans : defaultConfig.spans
  config.port =
    typeof config.port === 'number' ? config.port : defaultConfig.port
  config.chartVisibility =
    typeof config.chartVisibility === 'object'
      ? mergeChartVisibility(config.chartVisibility)
      : defaultConfig.chartVisibility
  config.ignoreStartsWith =
    typeof config.path === 'string'
      ? config.ignoreStartsWith
      : defaultConfig.ignoreStartsWith

  config.healthChecks = Array.isArray(config.healthChecks)
    ? config.healthChecks
    : defaultConfig.healthChecks
  config.healthChecksInterval =
    typeof config.healthChecksInterval === 'number'
      ? config.healthChecksInterval
      : defaultConfig.healthChecksInterval

  return config
}
