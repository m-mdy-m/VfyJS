const { Djibouti, Morocco, Kenya }= require('../countries/Africa')
function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Djibouti":
            return Djibouti(value)
        case "Morocco":
            return Morocco(value)
        case "Kenya":
            return Kenya(value)
    }
}

module.exports = AsiaPhoneNumber