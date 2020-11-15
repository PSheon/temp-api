const { sendEmail } = require('./sendEmail')

/**
 * Prepares to send email
 * @param {string} user - user object
 * @param {string} subject - subject
 * @param {string} htmlMessage - html message
 */
const prepareToSendEmail = (user = {}, subject = '', htmlMessage = '') => {
  const recipient = {
    memberId: user.memberId,
    email: user.email,
    verification: user.verification
  }
  const data = {
    user,
    subject,
    htmlMessage
  }
  if (process.env.NODE_ENV === 'production') {
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${recipient.email}`)
        : console.log(`Email FAILED to: ${recipient.email}`)
    )
  } else if (process.env.NODE_ENV === 'development') {
    console.log(data)
    // @ANCHOR
    sendEmail(data, (messageSent) =>
      messageSent
        ? console.log(`Email SENT to: ${recipient.email}`)
        : console.log(`Email FAILED to: ${recipient.email}`)
    )
  }
}

module.exports = { prepareToSendEmail }
