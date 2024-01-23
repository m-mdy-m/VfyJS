const {Australia, NewZealand} = require('../countries/Oceania')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Australia":
            return Australia(value)
        case "New Zealand":
            return NewZealand(value)
    }
}

module.exports = AsiaPhoneNumber