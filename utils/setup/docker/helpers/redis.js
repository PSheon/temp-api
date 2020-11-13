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

const buildRedisImage = (docker) =>
  new Promise((resolve, reject) => {
    docker.buildImage(
      {
        context: path.resolve(__dirname, '../../../../', 'docker', 'redis'),
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

const createRedisContainer = (docker) =>
  new Promise((resolve, reject) => {
    docker
      .createContainer({
        name: 'redis',
        Image: 'redis:latest',
        PortBindings: {
          '6379/tcp': [
            {
              HostIp: '127.0.0.1',
              HostPort: '6379'
            }
          ]
        }
      })
      .then(async (container) => {
        const redisContainer = container
        await redisContainer.start()
        resolve(container)
      })
      .catch((err) => {
        reject(err)
      })
  })

const startRedisContainer = (docker, containerId) =>
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
  const redisStatus = {}

  spinner.text = '建立 Redis 容器中...'
  /* 尋找所有映像檔 */
  const IMAGES = await getImages(docker)
  /* 尋找所有容器 */
  const CONTAINERS = await getContainers(docker)

  /* 尋找 Redis 映像檔 */
  const REDIS_IMAGE = IMAGES.find((image) =>
    image.RepoTags
      ? image.RepoTags.find((tag) => tag.startsWith('redis:latest'))
      : null
  )
  /* 尋找 Redis 容器 */
  const REDIS_CONTAINER = CONTAINERS.find((container) =>
    container.Image.startsWith('redis:latest')
  )
  /* 啟動 Redis 映像檔 */
  if (!REDIS_IMAGE) {
    await buildRedisImage(docker)
  }
  if (REDIS_CONTAINER) {
    redisStatus.containerId = REDIS_CONTAINER.Id
    redisStatus.isNew = false

    if (REDIS_CONTAINER.State !== 'running') {
      /* 啟動 Redis 容器 */
      await startRedisContainer(docker, REDIS_CONTAINER.Id)

      redisStatus.containerId = REDIS_CONTAINER.Id
      redisStatus.isNew = true
    }
  } else {
    /* 建立 Redis 容器 */
    const containerDetail = await createRedisContainer(docker)

    redisStatus.containerId = containerDetail.id
    redisStatus.isNew = true
  }

  spinner.text = '[Redis] 已開啟'

  return redisStatus
}
