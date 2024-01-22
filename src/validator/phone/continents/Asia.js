const {iran,China} = require('../countries/Asian')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "China":
            return China(value)
        case "Hong Kong and Macau":
            return '//'
        case "India":
            return '//'
        case "Iran":
            return iran(value)
        case "Japan":
            return '//'
        case "Malaysia":
            return '//'
        case "Pakistan":
            return '//'
        case "Philippines":
            return '//'
        case "Singapore":
            return '//'
        case "Sri Lanka":
            return '//'
        case "South Korea":
            return '//'
        case "Taiwan":
            return '//'
        case "Thailand":
            return '//'
    }
}

module.exports = AsiaPhoneNumber