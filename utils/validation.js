const validator = require('validator')

// Check password strength, at least 8 characters long and contains at least one letter and one number
const isStrongPassword = password => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
  return regex.test(password)
}

// Use a regular expression with the Unicode character set to allow letters and common accented characters
// John Müller
const isValidName = name => {
  const regex = /^[ A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff']+$/
  return regex.test(name)
}

// Use Unicode property escapes to match any letter and common punctuation marks
// John Müller 你好 مرحبا
function isValidNameWithUnicodeProps(name) {
  const regex = /^[ \p{L}\p{M}\p{Pd}'\u200c\u200d]+$/u
  return regex.test(name)
}

function isValidNameLength(name) {
  const minLength = 1
  const maxLength = 20
  return name.length >= minLength && name.length <= maxLength
}

function isValidUsernameLength(username) {
  const minLength = 5
  const maxLength = 30
  return username.length >= minLength && username.length <= maxLength
}

// Can contain lowercase and uppercase letters, numbers, and underscores
function isValidUsername(username) {
  const regex = /^[a-zA-Z0-9_]+$/
  return regex.test(username)
}

const validateUserEmail = email => {
  // Validate email
  if (!email || typeof email !== 'string') {
    return { status: 'error', message: 'Email is required' }
  }

  // Validate email using validator
  if (!email || typeof email !== 'string' || !validator.isEmail(email)) {
    return { status: 'error', message: 'Invalid email address' }
  }
  return { status: 'success' }
}

const validateUserPassword = password => {
  // Validate password
  if (!password || typeof password !== 'string') {
    return { status: 'error', message: 'Password is required' }
  }

  // Password strength check
  if (!isStrongPassword(password)) {
    return { status: 'error', message: 'Password must be at least 8 characters long and include at least one letter and number' }
  }
  return { status: 'success' }
}

const validateName = name => {
  // if (validator.isEmpty(name)) {
  //   return { status: 'error', message: 'Name is required' }
  // }

  if (!isValidNameLength(name)) {
    return { status: 'error', message: 'Name must be greater than 1 or less than 20 characters long.' }
  }

  if (!isValidName(name)) {
    return { status: 'error', message: 'Invalid name' }
  }
  return { status: 'success' }
}

const validateUsername = username => {
  // if (validator.isEmpty(username)) {
  //   return { status: 'error', message: 'Username is required' }
  // }

  if (!isValidUsernameLength(username)) {
    return { status: 'error', message: 'Username must be greater than 5 or less than 30 characters long.' }
  }

  if (!isValidUsername(username)) {
    return { status: 'error', message: 'Invalid username, only letters, numbers, and underscores are allowed.' }
  }
  return { status: 'success' }
}

module.exports = { validateUserEmail, validateUserPassword, validateName, validateUsername }
