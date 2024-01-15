'use strict';
const { MAX_LENGTH , MIN_LENGTH } = require('../../common/validationConstants')
const hasOption = require('../../utils/inputValidator')
const inputValidator = require('../../utils/inputValidator')
function validatePassword(value,options){
  const minLength = MIN_LENGTH
  const maxLength = MAX_LENGTH
  const has = inputValidator(value)
  
}reset