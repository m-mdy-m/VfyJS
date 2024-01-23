const { CostaRica, Guatemala, ElSalvador ,Honduras}=require('../../countries/America/central')
function CentralPhoneNumber(value){
    const country = value.country
    switch(country){
        case "Costa Rica":
            return CostaRica(value)
        case "El Salvador":
            return ElSalvador(value)
        case "Guatemala":
            return Guatemala(value)
        case "Honduras":
            return Honduras(value)
    }
}
module.exports = CentralPhoneNumber