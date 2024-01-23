const { Belgium, Denmark, Finland } = require("../countries/Europe")

function EuropePhoneNumber(value){
    const country = value.country
    switch (country){
        case "Belgium":
            return Belgium(value)
        case "Denmark":
            return Denmark(value)
        case "Finland":
            return Finland(value)
    }
}

module.exports = EuropePhoneNumber