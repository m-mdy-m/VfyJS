import { CheckLengths, MaxCheck, NotType, isEmpty } from "../../errors/Error.mjs";

export function validateCommon(value,Format){
    isEmpty(value,`${Format} is not Empty`)
    NotType(value,`string','Please enter a valid ${Format}`)
    value.trim()
    CheckLengths()
    MaxCheck()
}
