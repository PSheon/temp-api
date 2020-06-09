// TODO find better connection
const Queue = require('bull')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const avatarProcessQueue = new Queue('Avatar Process', {
  redis: { port: 6379, host: '0.0.0.0' }
})

avatarProcessQueue.process(async (job, done) => {
  const { oldAvatar, newAvatar } = job.data

  if (
    oldAvatar !== 'assets/images/avatars/penguin.png' &&
    fs.existsSync(
      path.resolve(__dirname, '../../../', 'uploads', 'avatar', oldAvatar)
    ) &&
    !oldAvatar.includes('http')
  ) {
    fs.unlinkSync(
      path.resolve(__dirname, '../../../', 'uploads', 'avatar', oldAvatar)
    )
    job.progress(20)
  }

  sharp(`uploads/avatar/${newAvatar}`)
    .resize({ height: 64, weight: 64 })
    .jpeg({
      quality: 70
    })
    .toFile(`uploads/avatar/croped-${newAvatar}`, (err, info) => {
      if (err) {
        console.log(err)
      }

      job.progress(100)
    })

  done()
})

module.exports = avatarProcessQueue
