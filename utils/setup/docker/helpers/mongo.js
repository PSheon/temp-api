const path = require('path')

const getImages = (docker) =>
  new Promise((resolve, reject) => {
    docker.listImages((err, images) => {
      if (err) {
        reject(err)
      }
      resolve(images)
    })
  })

const getContainers = (docker) =>
  new Promise((resolve, reject) => {
    docker.listContainers({ all: true }, (err, containers) => {
      if (err) {
        reject(err)
      }
      resolve(containers)
    })
  })

const buildMongoImage = (docker) =>
  new Promise((resolve, reject) => {
    docker.buildImage(
      {
        context: path.resolve(__dirname, '../../../../', 'docker', 'mongo'),
        src: ['Dockerfile']
      },
      (err, stream) => {
        if (err) {
          reject(err)
        }
        stream.pipe(process.stdout)
        stream.on('end', () => {
          resolve()
        })
      }
    )
  })

const createMongoContainer = (docker) =>
  new Promise((resolve, reject) => {
    docker
      .createContainer({
        name: 'mongo',
        Image: 'mongo:latest',
        PortBindings: {
          '27017/tcp': [
            {
              HostPort: '27017'
            }
          ]
        }
      })
      .then(async (container) => {
        const mongoContainer = container
        await mongoContainer.start()
        resolve(container)
      })
      .catch((err) => {
        reject(err)
      })
  })

const startMongoContainer = (docker, containerId) =>
  new Promise((resolve, reject) => {
    const container = docker.getContainer(containerId)
    if (!container) {
      reject()
    }
    container.start((err, containerDetail) => {
      if (err) {
        reject(err)
      }
      resolve(containerDetail)
    })
  })

/* eslint max-statements: ["error", 20]*/
module.exports = async (docker, spinner) => {
  const mongoStatus = {}

  spinner.text = '建立資料庫工廠中...'
  /* 尋找所有映像檔 */
  const IMAGES = await getImages(docker)
  /* 尋找所有容器 */
  const CONTAINERS = await getContainers(docker)

  /* 尋找 Mongo 映像檔 */
  const MONGO_IMAGE = IMAGES.find((image) =>
    image.RepoTags
      ? image.RepoTags.find((tag) => tag.startsWith('mongo:latest'))
      : null
  )
  /* 尋找 Mongo 容器 */
  const MONGO_CONTAINER = CONTAINERS.find((container) =>
    container.Image.startsWith('mongo:latest')
  )
  /* 啟動 Mongo 映像檔 */
  if (!MONGO_IMAGE) {
    await buildMongoImage(docker)
  }
  if (MONGO_CONTAINER) {
    mongoStatus.containerId = MONGO_CONTAINER.Id
    mongoStatus.isNew = false

    if (MONGO_CONTAINER.State !== 'running') {
      /* 啟動 Mongo 容器 */
      await startMongoContainer(docker, MONGO_CONTAINER.Id)

      mongoStatus.containerId = MONGO_CONTAINER.Id
      mongoStatus.isNew = true
    }
  } else {
    /* 建立 Mongo 容器 */
    const containerDetail = await createMongoContainer(docker)

    mongoStatus.containerId = containerDetail.id
    mongoStatus.isNew = true
  }

  spinner.text = '資料庫工廠已完成'

  return mongoStatus
}
