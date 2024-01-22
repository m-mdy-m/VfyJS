const {GlobalVal}= require('./utils/GlobalValidation')
const AsiaPhoneNumber = require('./continents/Asia')
async function validatePhoneNumber(code,phone){
  const informationPhone = await GlobalVal(code,phone)
  switch(informationPhone.continent){
    case "Asia":
      AsiaPhoneNumber(informationPhone)
      break;
    case "//":
      break;

  }
}
validatePhoneNumber(98,9115291407)


module.exports = validatePhoneNumber;
