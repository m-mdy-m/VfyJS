const { Belgium } = require("../countries/Europe")

function EuropePhoneNumber(value){
    const country = value.country
    switch (country){
        case "Belgium":
            return Belgium(value)
    }
}

module.exports = EuropePhoneNumber