require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

module.exports = {
  userActivation: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Activate Your Account',
    // text: userActivationLink => `Click on the following link to activate your account: ${userActivationLink}`,
    html: htmlContent => htmlContent
  },
  resetPassword: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Reset Your Password',
    // text: resetPasswordLink => `Click on the following link to reset your password: ${resetPasswordLink}`,
    html: htmlContent => htmlContent
  },
  changeEmail: {
    from: process.env.EMAIL_ADDRESS,
    subject: 'Confirm Your New Email',
    // text: changeEmailLink => `Click on the following link to confirm the new email address: ${changeEmailLink}`
    html: htmlContent => htmlContent
  }
}
