const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')

exports.generateRandomUUID = () => {
  return uuidv4()
}

exports.generateCryptoUUID = () => {
  const randomUUID = crypto.randomUUID()
  //   const randomUUID = crypto.randomUUID().replace(/-/g, '')
  return randomUUID
}

exports.generateVerificationCode = () => {
  const randomBytes = crypto.randomBytes(3).toString('hex').toUpperCase()
  return randomBytes
}
