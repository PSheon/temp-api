/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
const handleError = (res = {}, err = {}) => {
  // Prints error in console
  if (process.env.NODE_ENV === 'development') {
    console.log(err)
  }
  // Sends error to user
  res.status(err.code || 500).json({
    // NOTE here
    errors: err.message || [{ msg: '發生未預期的狀況.' }]
  })
}

module.exports = { handleError }
