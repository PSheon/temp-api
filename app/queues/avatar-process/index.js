const path = require('path')

const Queue = require('bull')
const sharp = require('sharp')

const avatarProcessQueue = new Queue('Avatar Process')

// TODO
avatarProcessQueue.process(async (job, done) => {
  const { avatarName } = job.data

  const ORIGIN_AVATAR_PATH = path.resolve(
    __dirname,
    '../../../',
    'uploads',
    'temp',
    avatarName
  )
  const NEW_AVATAR_PATH = path.resolve(
    __dirname,
    '../../../',
    'uploads',
    'avatar',
    avatarName
  )

  job.progress(20)

  await sharp(ORIGIN_AVATAR_PATH)
    // .resize({ height: 64, weight: 64 })
    // .jpeg({
    //   quality: 70
    // })
    .toFile(NEW_AVATAR_PATH)
    .then(() => {
      job.progress(100)
    })
    .catch(() => {
      done(new Error('Avatar Upload fail.'))
    })

  done()
})

module.exports = { avatarProcessQueue }
