const MIN_LENGTH = 8
const MAX_LENGTH = 64
const trimmedValue = (value)=>value.replace(/\s/g,'').trim()
module.exports = {MIN_LENGTH ,MAX_LENGTH,trimmedValue}