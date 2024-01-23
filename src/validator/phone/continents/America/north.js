const {} = require('../../countries/America/north')
function NorthPhoneNumber(value){
    const country = value.country
    if (Array.isArray(country)) {
        switch(country[0] || country[1]){
            case "Canada":
            case "United States":
                return CanadaOrUs(value)
        }
    }
    switch (country){
        case "Djibouti":
            return '//'

    }
}
module.exports = NorthPhoneNumber