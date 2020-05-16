// TODO
const Queue = require('bull')

const echoAppQueue = new Queue('Echo App setup')

echoAppQueue.process((job, done) => {
  job.progress(50)

  job.progress(100)

  console.log('job.data, ', job.data)

  // call done when finished
  done()
})

module.exports = echoAppQueue
