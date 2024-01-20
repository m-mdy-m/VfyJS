const fs = require('fs')
const path =  require('path')
const pathFile = path.join(__dirname + '/telephone_formats.json')
function createPhoneNumberFormat(name, code, fixed_linePattern, landLinePattern, localPattern, internationalPattern) {
    const countryFormatObject  ={
        "country": name,
        "countryCode": code,
        "formats": []
    }
    if (localPattern) {
        countryFormatObject.formats.push({
            "type": "local",
            "pattern": localPattern,
        });
    }
    if (internationalPattern) {
        countryFormatObject.formats.push({
            "type": "international",
            "pattern": internationalPattern
        });
    }
    if (fixed_linePattern) {
        countryFormatObject.formats.push({
            "type": 'fixed-line',
            'pattern': fixed_linePattern
        });
    }
    if (landLinePattern) {
        countryFormatObject.formats.push({
            "type": "landline",
            "pattern": landLinePattern
        });
    }

    return countryFormatObject;
}

function writeToJsonFile(data) {
    let existsCountry = data.country
    let countryExists = false
    let existingData = [];
    if (fs.existsSync(pathFile)) {
        const fileContent = fs.readFileSync(pathFile,'utf8')
        existingData = JSON.parse(fileContent)
        countryExists = existingData.some(content => content.country === existsCountry )
        if (countryExists) {
            console.log(`Country "${existsCountry}" already exists.`);
        }else{
            existingData.push(data)
            fs.writeFileSync(pathFile,JSON.stringify(existingData),'utf8')
        }
    }else{
        existingData.push(data)
        fs.writeFileSync(pathFile,JSON.stringify(existingData),'utf8')
    }
}
const formatObject = createPhoneNumberFormat("iran", "253", "^(21|27)[0-9]{6}$", null, "77[0-9]{6}$", "^\\+253[0-9]{8}$");
writeToJsonFile(formatObject);