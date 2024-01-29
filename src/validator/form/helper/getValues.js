const inputValidator = require("../../../utils/inputValidator")

exports.getReq = (value)=>{
    return value.required
}

exports.getValue = (value)=>{
    return value.value
}
exports.getErrorMessage = (value)=>{
    return value.msgError
}
exports.getStatusValue = (value, validations) => {
    
};