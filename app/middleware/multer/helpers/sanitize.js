const sanitizeUserDisplayname = (displayName) =>
  displayName
    .split(/[ -]/gmu)
    .join('_')
    .split(/[~!@#$%^&()+-={};',.[\]\\]/gmu)
    .join('')

module.exports = {
  sanitizeUserDisplayname
}
