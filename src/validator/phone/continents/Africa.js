const { Djibouti, Morocco }= require('../countries/Africa')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Djibouti":
            return Djibouti(value)
        case "Morocco":
            return Morocco(value)
        case "/":
            return '//'
    }
}

module.exports = AsiaPhoneNumber