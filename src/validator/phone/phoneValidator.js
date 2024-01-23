const {GlobalVal}= require('./utils/GlobalValidation')
const AsiaPhoneNumber = require('./continents/Asia')
const AfricaPhoneNumber = require('./continents/Africa')
async function validatePhoneNumber(code,phone){
  const informationPhone = await GlobalVal(code,phone)
  switch(informationPhone.continent){
    case "Asia":
      return AsiaPhoneNumber(informationPhone)
    case "Africa":
      return AfricaPhoneNumber(informationPhone)
  }
}
validatePhoneNumber('212', '0512345678').then(result => {
  console.log(result);
});
module.exports = validatePhoneNumber;
