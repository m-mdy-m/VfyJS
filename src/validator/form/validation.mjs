import {  NotType, isEmpty, validateMinLength, validationsLength } from "../../errors/Error.mjs";

export function validateCommon(value,format,min=8,max=8){
    isEmpty(value,`${format} is not Empty`)
    NotType(value,`string','Please enter a valid ${format}`)
    value.trim()
    validationsLength(value,{
        min,
        max,
        minError: `Invalid ${format} length. Minimum length is ${min}.`,
        maxError:`Invalid ${format} length. Maximum length is ${max}.`
    })
}
