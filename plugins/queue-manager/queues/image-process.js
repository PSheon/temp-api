// TODO find better connection
const Queue = require('bull')

const imageProcessQueue = new Queue('Image Process', {
  redis: { port: 6379, host: '0.0.0.0' }
})

imageProcessQueue.process((job, done) => {
  job.progress(50)

  job.progress(100)

  console.log('job.data, ', job.data)

  // call done when finished
  done()
})

module.exports = imageProcessQueue
