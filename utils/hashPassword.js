const bcrypt = require('bcrypt')

const hashPassword = async password => {
  return await bcrypt.hash(password, 10) // 10 is the number of salt rounds
}

module.exports = { hashPassword }
