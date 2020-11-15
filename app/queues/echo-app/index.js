// TODO find better connection
const Queue = require('bull')

const echoAppQueue = new Queue('Echo App setup', {
  redis: { port: 6379, host: '0.0.0.0' }
})

echoAppQueue.process((job, done) => {
  job.progress(50)

  job.progress(100)

  console.log('job.data, ', job.data)

  // call done when finished
  done()
})

module.exports = { echoAppQueue }
