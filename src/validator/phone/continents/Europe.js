const {KazakhstanOrRussia,Romania,Portugal,Poland, Belgium, Denmark, Finland,France ,Germany,Greece,Hungary,Iceland,Ireland,Italy,Netherlands,Norway} = require("../countries/Europe")

function EuropePhoneNumber(value){
    const country = value.country
    if (country[0] || country[1]) {
        switch(country[0] || country[1]){
            case "Kazakhstan":
            case "Russia":
                return KazakhstanOrRussia(value)
        }
    }
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
        case "Italy":
            return Italy(value)
        case "Netherlands":
            return Netherlands(value)
        case "Norway":
            return Norway(value)
        case "Poland":
            return Poland(value)
        case "Portugal":
            return Portugal(value)
        case "Romania":
            return Romania(value)
    }
}

module.exports = EuropePhoneNumber