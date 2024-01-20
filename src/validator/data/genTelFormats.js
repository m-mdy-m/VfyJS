const fs = require('fs')
const path =  require('path')
const pathFile = path.join(__dirname + '/telephone_formats.json')
function createPhoneNumberFormats(
    continent,
    countries = [],
    countryCodes = [],
    fixedLinePatterns = [],
    fixedLinePatternName,
    landLinePatterns = [],
    landLinePatternName,
    localPatterns = [],
    localPatternName,
    internationalPatterns = [],
    internationalPatternName,
    { objOption } = {}
) {
    const countryFormats = [];

    for (let i = 0; i < countries.length; i++) {
        const countryFormatObject = {
            "continent": continent,
            "country": countries[i],
            "countryCode": countryCodes[i],
            "formats": []
        };

        if (localPatterns && localPatterns[i]) {
            countryFormatObject.formats.push({
                "type": localPatternName,
                "pattern": localPatterns[i],
            });
        }
        if (internationalPatterns && internationalPatterns[i]) {
            countryFormatObject.formats.push({
                "type": internationalPatternName,
                "pattern": internationalPatterns[i]
            });
        }
        if (fixedLinePatterns && fixedLinePatterns[i]) {
            countryFormatObject.formats.push({
                "type": fixedLinePatternName,
                'pattern': fixedLinePatterns[i]
            });
        }
        if (landLinePatterns && landLinePatterns[i]) {
            countryFormatObject.formats.push({
                "type": landLinePatternName,
                "pattern": landLinePatterns[i]
            });
        }

        countryFormats.push(countryFormatObject);
    }

    return countryFormats;
}

function writeToJsonFile(data) {
    const existingCountries = data.map(country => country.country);
    let countryExists = false;
    let existingData = [];

    if (fs.existsSync(pathFile)) {
        const fileContent = fs.readFileSync(pathFile, 'utf8');
        existingData = JSON.parse(fileContent);

        // Check if any country already exists in the file
        countryExists = existingData.some(content => existingCountries.includes(content.country));

        if (countryExists) {
            console.log(`Countries already exist in the JSON file.`);
        } else {
            // Add the new countries data to the existing data
            existingData.push(...data);
            fs.writeFileSync(pathFile, JSON.stringify(existingData, null, 2), 'utf8');
            console.log(`Countries added to the JSON file.`);
        }
    } else {
        // If the file doesn't exist, create it with the new data
        existingData.push(...data);
        fs.writeFileSync(pathFile, JSON.stringify(existingData, null, 2), 'utf8');
        console.log(`Countries added to the JSON file.`);
    }
}
// information for AFrica
const africaContinent = 'Africa';
const africanCountries = ['Djibouti', 'Morocco', 'Kenya', 'South Africa'];
const africanCountryCodes = ['253', '212', '254', '27'];
const africanLocalPatterns = ["^(21|27)[0-9]{4}$", "^(05[0-9]{2}){2}[0-9]{4}$", "^0[0-9]{3}[0-9]{6}$", "^(0[0-9]{2}|0AA)[0-9]{7}$"];
const africanLocalPatternName = 'local';
const africanInternationalPatterns = ["^\\+253[0-9]{8}$", "^\\+212[567][0-9]{8}$", "^\\+254[0-9]{9}$", "^\\+27[0-9]{9}$"];
const africanInternationalPatternName = 'international';
const africanFixedLinePatterns = ["^(21|27)[0-9]{4}$", "^(05[0-9]{2}){2}[0-9]{4}$", "^0[0-9]{3}[0-9]{6}$", "^(0[0-9]{2}|0AA)[0-9]{7}$"];
const africanFixedLinePatternName = 'fixed-line';
const africanFormatObject = createPhoneNumberFormats(
    africaContinent,
    africanCountries,
    africanCountryCodes,
    africanFixedLinePatterns,
    africanFixedLinePatternName,
    null, null,
    africanLocalPatterns,
    africanLocalPatternName,
    africanInternationalPatterns,
    africanInternationalPatternName
);
writeToJsonFile(africanFormatObject);
// Information for Asia
const asiaContinent = 'Asia';
const asianCountries = [];
const asianCountryCodes = [];
const asianLocalPatterns = [];
const asianInternationalPatterns = [];
const asianFixedLinePatterns = [];

