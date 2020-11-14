/**
 * Gets request pathname
 * @param {*} req - request object
 */
const getPathname = ({ baseUrl, path }) => `${baseUrl}${path}`

module.exports = { getPathname }
