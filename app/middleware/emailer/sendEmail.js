const PROCESS_ENV = require('config')

const nodemailer = require('nodemailer')
const mg = require('nodemailer-mailgun-transport')

/**
 * Sends email
 * @param {Object} data - data
 * @param {boolean} callback - callback
 */
const sendEmail = async (data = {}, callback) => {
  const auth = {
    auth: {
      // eslint-disable-next-line camelcase
      api_key: PROCESS_ENV.EMAIL_SMTP_API_MAILGUN,
      domain: PROCESS_ENV.EMAIL_SMTP_DOMAIN_MAILGUN
    }
  }
  const transporter = nodemailer.createTransport(mg(auth))
  const mailOptions = {
    from: `${PROCESS_ENV.EMAIL_FROM_NAME} <${PROCESS_ENV.EMAIL_FROM_ADDRESS}>`,
    to: `${data.user.memberId} <${data.user.email}>`,
    subject: data.subject,
    html: data.htmlMessage
  }
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      return callback(false)
    }
    return callback(true)
  })
}

module.exports = { sendEmail }
