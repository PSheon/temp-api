const { matchedData } = require('express-validator')

const { handleError } = require('../../middleware/utils')
const { avatarProcessQueue } = require('../../queues/avatar-process')

/**
 * Update onself avatar function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateAvatar = async (req, res) => {
  try {
    const data = matchedData(req)
    // @ANCHOR
    await avatarProcessQueue.add({ avatarName: data.avatarName })

    res.status(200).json({ msg: 'UPDATED_AVATAR' })
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateAvatar }
