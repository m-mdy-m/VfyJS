const { Argentina, Brazil, Peru } = require("../../countries/America/south")

function SouthPhoneNumber(value){
    const country = value.country
    switch(country){
        case "Argentina":
            return Argentina(value)
        case "Brazil":
            return Brazil(value)
        case "Peru":
            return Peru(value)
    }
}
module.exports = SouthPhoneNumber