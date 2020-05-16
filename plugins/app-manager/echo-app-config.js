// TODO
const validate = require('./helpers/validate')

module.exports = () => {
  const validatedConfig = validate({
    name: 'echo',
    // eslint-disable-next-line
    exec_mode: 'cluster',
    instances: 2,
    // eslint-disable-next-line
    max_memory_restart: '100M'
  })

  return validatedConfig
}
