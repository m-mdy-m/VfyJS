const { Belgium, Denmark } = require("../countries/Europe")

function EuropePhoneNumber(value){
    const country = value.country
    switch (country){
        case "Belgium":
            return Belgium(value)
        case "Denmark":
            return Denmark(value)
    }
}

module.exports = EuropePhoneNumber