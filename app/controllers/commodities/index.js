const { createCommodity } = require('./createCommodity')
const { deleteCommodity } = require('./deleteCommodity')
const { getCommodities } = require('./getCommodities')
const { getCommodity } = require('./getCommodity')
const { updateCommodity } = require('./updateCommodity')

module.exports = {
  getCommodity,
  getCommodities,
  createCommodity,
  updateCommodity,
  deleteCommodity
}
