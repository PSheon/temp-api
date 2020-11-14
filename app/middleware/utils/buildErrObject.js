/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
const buildErrObject = (code, message) => {
  if (typeof message === 'string') {
    return {
      code,
      message: [{ msg: message }]
    }
  }

  return {
    code,
    message
  }
}

module.exports = { buildErrObject }
