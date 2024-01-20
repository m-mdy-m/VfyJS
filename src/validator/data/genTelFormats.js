const fs = require('fs')
const path =  require('path')
const pathFile = path.join(__dirname + '/telephone_formats.json')
function createPhoneNumberFormat(
continent,
name = [],
code = [],
//---

fixed_linePattern = [],fixPattern_name,
landLinePattern = [],landLinePattern_name,
localPattern = [],localPattern_name,
internationalPattern = [],fixPattern_international,{objOption}={})
 {
    const countries = [];

    for (let i = 0; i < name.length; i++) {
        const countryFormatObject = {
            "continent": continent,
            "country": name[i],
            "countryCode": code[i],
            "formats": []
        };

        if (localPattern && localPattern[i]) {
            countryFormatObject.formats.push({
                "type": localPattern_name,
                "pattern": localPattern[i],
            });
        }
        if (internationalPattern && internationalPattern[i]) {
            countryFormatObject.formats.push({
                "type": fixPattern_international,
                "pattern": internationalPattern[i]
            });
        }
        if (fixed_linePattern && fixed_linePattern[i]) {
            countryFormatObject.formats.push({
                "type": fixPattern_name,
                'pattern': fixed_linePattern[i]
            });
        }
        if (landLinePattern && landLinePattern[i]) {
            countryFormatObject.formats.push({
                "type": landLinePattern_name,
                "pattern": landLinePattern[i]
            });
        }

        countries.push(countryFormatObject);
    }

    return countries;
}

function writeToJsonFile(data) {
    let existsCountries = data.map(country => country.country);
    let countryExists = false;
    let existingData = [];

    if (fs.existsSync(pathFile)) {
        const fileContent = fs.readFileSync(pathFile, 'utf8');
        existingData = JSON.parse(fileContent);

        // Check if any country already exists in the file
        countryExists = existingData.some(content => existsCountries.includes(content.country));

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
const Africa = 'Africa'
const countryAfrica = ['Djibouti','Morocco','Kenya','South Africa']
const codeCountryAfrica = ['"253"','212','254','27']
const localPatternAfrica = ["^(21|27)[0-9]{4}$","^(05[0-9]{2}){2}[0-9]{4}$","^0[0-9]{3}[0-9]{6}$","^(0[0-9]{2}|0AA)[0-9]{7}$"]
const localPatternAfrica_name = 'local'
const internationalPatternAfrica = ["^\\+253[0-9]{8}$","^\\+212[567][0-9]{8}$","^\\+254[0-9]{9}$","^\\+27[0-9]{9}$"]
const internationalPatternAfrica_name = 'international'
const fixed_linePatternAfrica = ["^(21|27)[0-9]{4}$","^(05[0-9]{2}){2}[0-9]{4}$","^0[0-9]{3}[0-9]{6}$", "^(0[0-9]{2}|0AA)[0-9]{7}$"]
const fixed_linePatternAfrica_name = 'fixed-line'
const formatObjectAfrica = 
createPhoneNumberFormat
(
    Africa,
    countryAfrica
    ,codeCountryAfrica
    ,fixed_linePatternAfrica , fixed_linePatternAfrica_name
    ,null,null
    ,localPatternAfrica,localPatternAfrica_name
    ,internationalPatternAfrica,internationalPatternAfrica_name
    );
writeToJsonFile(formatObjectAfrica);
/// information  Asia
const Asia = 'Asia'
const countryAsia = []
const codeCountryAsia = []
const localPattern = []
const internationalPattern = []
const fixed_linePattern = []

