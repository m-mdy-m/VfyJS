const { Djibouti }= require('../countries/Africa')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Djibouti":
            return Djibouti(value)
        case "//":
            return ''
        case "/":
            return '//'
    }
}

module.exports = AsiaPhoneNumber