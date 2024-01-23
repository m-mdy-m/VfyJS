const { CostaRica }=require('../../countries/America/central')
function CentralPhoneNumber(value){
    const country = value.country
    switch(country){
        case "Costa Rica":
            return CostaRica(value)
        case "El Salvador":
            return //
    }
}
module.exports = CentralPhoneNumber