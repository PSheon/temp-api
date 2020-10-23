const CFonts = require('cfonts')

const PACKAGE = require('../../package.json')

const formatter = (name) => name.replace(/-/g, '|')

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    /* Package Name */
    CFonts.say(formatter(PACKAGE.name), {
      font: 'block',
      align: 'center',
      colors: ['system', 'green'],
      background: 'transparent',
      letterSpacing: 1,
      lineHeight: 1,
      space: true,
      maxLength: '0',
      gradient: false,
      independentGradient: false,
      transitionGradient: false,
      env: 'node'
    })

    /* Package Version */
    if (PACKAGE.version) {
      CFonts.say(`ver. ${PACKAGE.version}`, {
        font: 'block',
        align: 'center',
        colors: ['system', 'green'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
      })
    }

    /* Package Author */
    if (PACKAGE.author) {
      CFonts.say(`- ${PACKAGE.author} -`, {
        font: 'simple',
        align: 'center',
        colors: ['#00ff00'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node'
      })
    }
  }
}
