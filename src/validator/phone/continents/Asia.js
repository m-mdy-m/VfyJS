const {iran,China,HongKongAndMacau, India, Japan, Malaysia, Pakistan, Philippines} = require('../countries/Asian')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "China":
            return China(value)
        case "Hong Kong and Macau":
        case "Hong Kong":
            return HongKongAndMacau(value)
        case "India":
            return India(value)
        case "Iran":
            return iran(value)
        case "Japan":
            return Japan(value)
        case "Malaysia":
            return Malaysia(value)
        case "Pakistan":
            return Pakistan(value)
        case "Philippines":
            return Philippines(value)
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