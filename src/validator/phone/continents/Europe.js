const { Belgium, Denmark, Finland,France ,Germany,Greece,Hungary,Iceland,Ireland} = require("../countries/Europe")

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
        case "Greece":
            return Greece(value)
        case "Hungary":
            return Hungary(value)
        case "Iceland":
            return Iceland(value)
        case "Ireland":
            return Ireland(value)
    }
}

module.exports = EuropePhoneNumber