const axios = require('axios')

const allSettled = (promises) => {
  const wrappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (val) => ({ state: 'fulfilled', value: val }),
      (err) => ({ state: 'rejected', reason: err })
    )
  )

  return Promise.all(wrappedPromises)
}

module.exports = async (healthChecks = []) => {
  const checkPromises = []
  healthChecks.forEach((healthCheck) => {
    let uri = `${healthCheck.protocol}://${healthCheck.host}`

    if (healthCheck.port) {
      uri += `:${healthCheck.port}`
    }

    uri += healthCheck.path

    checkPromises.push(
      axios({
        url: uri,
        method: healthCheck.method
      })
    )
  })

  const checkResults = []

  return allSettled(checkPromises).then((results) => {
    results.forEach((result, index) => {
      if (result.state === 'rejected') {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'Failed'
        })
      } else {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'Succeed'
        })
      }
    })

    return checkResults
  })
}
