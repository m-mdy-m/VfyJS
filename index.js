const passwordValidate = require('./src/validator/form/password');
const emailValidate = require('./src/validator/form/email')
const userValidate = require('./src/validator/form/username')

const colorValidate = require('./src/validator/colors/isColor')
/**
 * Validates a password based on specified criteria.
 *
 * @function
 * @param {string} value - The password string to be validated.
 * @param {Object} options - Options for customizing validation criteria.
 * @returns {boolean} - True if the password is valid, otherwise false.
 * @throws {Error} - Throws an error if validation fails.
 */
exports.password = passwordValidate
exports.email = emailValidate
exports.username = userValidate
exports.isColor = colorValidate