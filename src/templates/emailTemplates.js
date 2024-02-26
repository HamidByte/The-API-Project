const generateUserActivationEmailHTML = (email, userActivationCode, userActivationLink) => {
  return `
  Dear ${email}
  <br /><br />
  <p>This is to confirm that we have received your registration information and to verify the email address you have provided.</p>
  <br />
  <p>To complete your registration, please enter the following code.</p>
  <h2 style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center;">${userActivationCode}</h2>
  <p style="padding: 20px 0; font-weight: bold; font-size: 16px;">
    Alternatively, click the link below to activate your account:
    <a href="${userActivationLink}" target="_blank" style="display: inline-block; padding: 0 10px; color: #007bff; text-decoration: none; font-weight: bold; font-size: 18px;">
      Click here to activate
    </a>
  </p>
  `
}

const generatePasswordResetEmailHTML = (email, resetPasswordLink) => {
  return `
  Dear ${email}
  <br /><br />
  You have requested to reset your password. You are expected to change or retain your current password.
  <br /><br />
  Click on the following link to reset your password: ${resetPasswordLink}
  <br /><br />
  <em><strong>This link will expire in 24 hours</strong></em>
  `
}

const generateChangeEmailHTML = (email, changeEmailToken, changeEmailLink) => {
  return `
  Dear ${email}
  <br /><br />
  You have requested to change your email address. You are expected to change or retain your current email.
  <br /><br />
  To complete your registration, please enter the following code.
  <br />
  <h2 style="background-color: #e6f7ff; padding: 10px; border-radius: 5px; text-align: center;">${changeEmailToken}</h2>
  <br />
  Alternatively, click the link below to change your email address: ${changeEmailLink}
  <br /><br />
  <em><strong>This link will expire in 24 hours</strong></em>
  `
}

module.exports = { generateUserActivationEmailHTML, generatePasswordResetEmailHTML, generateChangeEmailHTML }
