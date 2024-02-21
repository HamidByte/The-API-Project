const userConfig = {
  activateTokenExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours validity
  resendActivationExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours validity
  resetPasswordExpiration: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours validity
}

module.exports = userConfig
