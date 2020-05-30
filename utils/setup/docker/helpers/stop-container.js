module.exports = async (docker, containerId) =>
  new Promise((resolve, reject) => {
    const container = docker.getContainer(containerId)
    container.stop((err, containerDetail) => {
      if (err) {
        reject(err)
      }

      resolve(containerDetail)
    })
  })
