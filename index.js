const passwordValidate = require('./src/validator/form/password');
const emailValidate = require('./src/validator/form/email')
const userValidate = require('./src/validator/form/username')
const isHttp = require('./src/validator/links/http')
const isHttps = require('./src/validator/links/https')
const colorValidate = require('./src/validator/colors/isColor');
const validatePhoneNumber = require('./src/validator/phone/phoneValidator');

//
const inputValidations = require('./src/utils/inputValidator')
const {getSubstring}= require('./src/validator/phone/utils/FormatValidation')
const {trimmedValue}=require('./src/common/validationConstants')
const HandleError = require('./src/errors/HandleError')
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
exports.isHttp = isHttp
exports.isHttps = isHttps
exports.validPhone = validatePhoneNumber


// utils 

exports.inputValidations =inputValidations
exports.getSubstring = getSubstring
exports.trimValue = trimmedValue
exports.HandleError = HandleError