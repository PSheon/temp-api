const utils = require('../../middleware/utils')

const GET_TABLE = {
  '/api': ''
}
const POST_TABLE = {
  '/api': ''
}
const PUT_TABLE = {
  '/api': ''
}
const PATCH_TABLE = {
  '/api': ''
}
const DELETE_TABLE = {
  '/api': ''
}

const getAction = (req) => {
  const method = utils.getMethod(req)
  const pathname = utils.getPathname(req)

  let action

  switch (method) {
    case 'GET':
      action = GET_TABLE[pathname]
      break
    case 'POST':
      action = POST_TABLE[pathname]
      break
    case 'PUT':
      action = PUT_TABLE[pathname]
      break
    case 'PATCH':
      action = PATCH_TABLE[pathname]
      break
    case 'DELETE':
      action = DELETE_TABLE[pathname]
      break
  }

  return action
}

module.exports = {
  getAction
}
