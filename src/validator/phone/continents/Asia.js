const {iran} = require('../countries/Asian')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Iran":
            return iran(value)
        case "":
            return '//'
    }
}

module.exports = AsiaPhoneNumber