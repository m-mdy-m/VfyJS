const {GlobalVal}= require('./utils/GlobalValidation')
const AsiaPhoneNumber = require('./continents/Asia')
async function validatePhoneNumber(code,phone){
  const informationPhone = await GlobalVal(code,phone)
  switch(informationPhone.continent){
    case "Asia":
      return AsiaPhoneNumber(informationPhone)
    case "//":
      return '//'
  }
}
validatePhoneNumber('92', '0511234567').then(result => {
  console.log(result);
});
module.exports = validatePhoneNumber;
