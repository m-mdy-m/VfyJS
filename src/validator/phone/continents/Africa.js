const { Djibouti, Morocco, Kenya,SouthAfrica }= require('../countries/Africa')
function AfricaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "Djibouti":
            return Djibouti(value)
        case "Morocco":
            return Morocco(value)
        case "Kenya":
            return Kenya(value)
        case "South Africa":
            return SouthAfrica(value)
    }
}

module.exports = AfricaPhoneNumber