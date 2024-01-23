const { CostaRica, Guatemala, ElSalvador }=require('../../countries/America/central')
function CentralPhoneNumber(value){
    const country = value.country
    switch(country){
        case "Costa Rica":
            return CostaRica(value)
        case "El Salvador":
            return ElSalvador(value)
        case "Guatemala":
            return Guatemala(value)
    }
}
module.exports = CentralPhoneNumber