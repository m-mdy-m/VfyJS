const fs = require('fs')
const path =  require('path')
const pathFile = path.join(__dirname + '/telephone_formats.json')
console.log('path =>',pathFile);
function createPhoneNumberFormat(name, code, fixed_linePattern, landLinePattern, localPattern, internationalPattern) {
    let countryFormatObject  = {}
    const countryFormatsArray  =[{
        "country": name,
        "countryCode": code,
        "formats": []
    }]
    countryFormatsArray .forEach(format =>{
        countryFormatObject = format
    })
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

    return countryFormatsArray;
}

function writeToJsonFile(data) {
    // fs.writeFileSync(pathFile, JSON.stringify(data))
    // const dataCountry = data
    // console.log(dataCountry);
    // const jsonData = fs.readFileSync(pathFile,'utf8')
    // const countries = JSON.parse(jsonData)
    
    // const countryExists  = ''
    // // let existingData = [];

    // // Check if the file exists
    // if (fs.existsSync(pathFile)) {
    //     // Read existing data from the file
    //     const fileContent = fs.readFileSync(pathFile, 'utf8');
    //     console.log('fileContent =>', fileContent);

    //     // Parse existing data as JSON if the file is not empty
    //     if (fileContent.trim() !== '') {
    //         existingData = JSON.parse(fileContent);
    //         console.log('existingData (parsed) =>', existingData);

    //         // Ensure existingData is an array
    //         if (!Array.isArray(existingData)) {
    //             existingData = [existingData];
    //         }
    //     }
    // }

    // // Add new data to existing data
    // existingData.push(data);
    // console.log('mergedData =>', existingData);

    // // Write merged data back to the file
    // fs.writeFileSync(pathFile, JSON.stringify(existingData, null, 2));
}
const formatObject = createPhoneNumberFormat("Djibouti", "253", "^(21|27)[0-9]{6}$", null, "77[0-9]{6}$", "^\\+253[0-9]{8}$");
writeToJsonFile(formatObject);