const { Belgium, Denmark, Finland,France ,Germany} = require("../countries/Europe")

function EuropePhoneNumber(value){
    const country = value.country
    switch (country){
        case "Belgium":
            return Belgium(value)
        case "Denmark":
            return Denmark(value)
        case "Finland":
            return Finland(value)
        case "France":
            return France(value)
        case "Germany":
            return Germany(value)
    }
}

module.exports = EuropePhoneNumber