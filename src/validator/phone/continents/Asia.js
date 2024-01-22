const {iran} = require('../countries/Asian')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Iran":
            iran(value)
            break;
    }
}

module.exports = AsiaPhoneNumber