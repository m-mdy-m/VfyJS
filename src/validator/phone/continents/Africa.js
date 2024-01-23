function AsiaPhoneNumber(value){
    const country = value.country
    switch (country){
        case "":
            return ''
        case "//":
            return ''
        case "/":
            return '//'
    }
}

module.exports = AsiaPhoneNumber