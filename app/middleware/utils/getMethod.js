const METHOD_TABLE = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

/**
 * Gets request method
 * @param {*} req - request object
 */
const getMethod = ({ method }) => {
  return METHOD_TABLE.find((item) => item === method)
}

module.exports = { getMethod }
