const fs = require('fs')
const path =  require('path')
const pathFile = path.join(__dirname,'..','resources','TelResource.json')
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
const africanLocalPatterns = ["^(21|27)[0-9]{4}$","^(05[0-9]{2}){2}[0-9]{4}$", "^0[0-9]{3}[0-9]{6}$", "^(0[0-9]{2}|0AA)[0-9]{7}$"];
const africanLocalPatternName = 'local';
const africanInternationalPatterns = ["^+253[0-9]{8}$","^+212[567][0-9]{8}$", "^+254[0-9]{9}$", "^+27[0-9]{9}$"];
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
const asianCountries = ['China','Hong Kong and Macau','India','Iran','Japan','Malaysia','Pakistan','Philippines','Singapore','Sri Lanka','South Korea','Taiwan','Thailand'];
const asianCountryCodes =[
'86',  //China
'852',  ///Hong Kong and Macau
'91',  ///India 
'98',  //Iran 
'81',  /// Japan 
'60',  // Malaysia 
'92',  ///Pakistan 
'63',  /// Philippines 
'65',  // Singapore 
'94',  //Sri Lanka 
'82',  // South Korea 
'886',  // Taiwan 
'66' //Thailand 
];
const asianFixedLinePatterns = [
  //China
  '^0\\d{2,3}\\d{7,8}$',
  ///Hong Kong and Macau
  '^\\d{4}\\d{4}$',
  ///India 
  "^\\d{3,4}-\\d{6,7}$",
  //Iran 
  "^0\\d{2}?\\d{8}$",
  /// Japan 
  "^0\\d{2}-\\d{4}-\\d{4}$",
  // Malaysia 
  "^0\\d{1,2}-\\d{7,8}$",
  ///Pakistan 
  "^0\\d{2}-\\d{7,8}$",
  /// Philippines 
  "^\\d{11}$",
  // Singapore 
  "^\\d3\\d3 \\d{1} \\d{6}$",
  //Sri Lanka 
  "^0\\d{1,3}-\\d{3,4}-\\d{4}$",
  // South Korea 
  "^\\d2\\d2\\d{4}\\d{4}$",
  // Taiwan 
  "^\\d{4} \d{4}$",
  // Thailand 
  "^0\\d{1,2}-\\d{7}$"
]
const asianFixedLinePatternName = 'landline'
const asianLocalPatterns = [
  //China
  '^1[3-9]\\d{9}$',
  ///Hong Kong and Macau
  null,
  ///India 
  "^\\+9[1-9]\\d{10}$",
  //Iran 
  "^09\\d{9}$",
  /// Japan 
  "^(0120|0570|0800)-\\d{2}-\\d{4}$",
  // Malaysia 
  "^01\\d{1}-\\d{6,8}$",
  ///Pakistan 
  null,
  /// Philippines 
  "^(+63|0)\\d{10}$",
  // Singapore 
  "^\\d{3} \\d{7}$",
  //Sri Lanka 
  "^01\\d{1}-\\d{4}-\\d{4}$",
  // South Korea 
  "^0\\d{3} \\d{4}$",
  // Taiwan 
  null,
  // Thailand 
  "^0\\d{9}$"
]
const asianLocalPatternName = 'mobile'
const asianLandLinePatterns = [
  //China
  '^(800|400)\\d{4}\\d{4}$',
  ///Hong Kong and Macau
  null,
  ///India 
  "^1-800\\d{6}$",
  //Iran 
  null,
  /// Japan 
  null,
  // Malaysia 
  "^1-800-\\d{2}-\\d{4}$",
  ///Pakistan 
  null,
  /// Philippines 
  null,
  // Singapore 
  null,
  //Sri Lanka 
  "^070-\\d{4}-\\d{4}$",
  // South Korea 
  "^09\\d{2} \\d{6}$",
  // Taiwan 
  null,
  // Thailand 
  null,
]
const asianLandLinePatternName = 'toll-free"'
const asianInternationalPatterns = [
  //China
  '^\\d{3,5}$',
  null,
  ///India 
  "^\\d{3,4}$",
  //Iran 
  "^\\+98(0\\d{2}|09)\\d{8}$",
  /// Japan 
  "^1[12]$",
  // Malaysia 
  "^1-300-\\d{2}-\\d{4}$",
  ///Pakistan 
  null,
  /// Philippines 
  null,
  // Singapore 
  "^+94 (\\d{3} \\d{1}|\\d{3}) \\d{6}$",
  //Sri Lanka 
  "^1[12]{2}$",
  // South Korea 
  null,
  // Taiwan 
  "^+66 \\d{4} \\d{4}$",
  // Thailand 
  null,
]
const asianInternationalPatternNam = 'service'
const asianFormatObject = createPhoneNumberFormats(asiaContinent,asianCountries,asianCountryCodes,asianFixedLinePatterns,asianFixedLinePatternName,asianLandLinePatterns,asianLandLinePatternName,asianLocalPatterns,asianLocalPatternName,asianInternationalPatterns,asianInternationalPatternNam)
writeToJsonFile(asianFormatObject)


// Information for Oceania
const oceaniaContinent = 'Oceania';
const oceaniaCountries = ['Australia', 'New Zealand'];
const oceaniaCountryCodes = ['61', '64'];

// Patterns for Australia
const oceaniaFixedLinePatternsAustralia = ['^(0[2378])?\\d{8}$',"^\\d{4} \\d{4}$"];
const oceaniaFixedLinePatternNameAustralia = 'landline';
const oceaniaLocalPatternsAustralia = ['^1[3-9]\\d{9}$', null,];
const oceaniaLocalPatternNameAustralia = 'mobile';
const oceaniaLandLinePatternsAustralia = ['^(800|400) \\d{4} \\d{4}$', null,];
const oceaniaLandLinePatternNameAustralia = 'toll-free';
const oceaniaInternationalPatternsAustralia = ['^\\d{3,5}$', null];
const oceaniaInternationalPatternNameAustralia = 'service';
const oceaniaFormatObject = createPhoneNumberFormats(
    oceaniaContinent,
    oceaniaCountries,
    oceaniaCountryCodes,
    oceaniaFixedLinePatternsAustralia,
    oceaniaFixedLinePatternNameAustralia,
    oceaniaLandLinePatternsAustralia,
    oceaniaLandLinePatternNameAustralia,
    oceaniaLocalPatternsAustralia,
    oceaniaLocalPatternNameAustralia,
    oceaniaInternationalPatternsAustralia,
    oceaniaInternationalPatternNameAustralia
);

writeToJsonFile(oceaniaFormatObject);


// Information for Europe
const europeContinent = 'Europe';
const europeanCountries = ['Belgium', 'Denmark', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia'];
const europeanCountryCodes = ['32', '45', '358', '33', '49', '30', '36', '354', '353', '39', '31', '47', '48', '351', '40', '7'];

const europeanFixedLinePatterns = [
  '^0[0-9]{1}[0-9]{1} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Belgium 
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Denmark 
  '^0[0-9]{1}-[0-9]{3} [0-9]{3} [0-9]{2}$',  // Finland 
  '^0[1-9]{1} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // France 
  '^0[0-9]{3} [0-9]{6,8}(-[0-9]{2})?$',  // Germany 
  '^[0-9]{3} [0-9]{7,8}$',  // Greece 
  '^[0-9]{2} [0-9]{6}$',  // Hungary 
  '^[0-9]{3} [0-9]{4}$',  // Iceland 
  '^[0-9]{2,3} [0-9]{5,7}$',  // Ireland 
  null,  // Italy
  '^0[0-9]{1,2}-[0-9]{7,9}$',  // Netherlands
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Norway
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',  // Poland
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',  // Portugal
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',  // Romania
  '^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$',  // Russia
];

const europeanFixedLinePatternName = 'landline';

const europeanLocalPatterns = [
  '^0[0-9]{1}[0-9]{1} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Belgium 
  null,  // Denmark 
  '^0[7-9]{1}[0-9]{1}-[0-9]{3} [0-9]{2} [0-9]{2}$',  // Finland 
  '^06 [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // France 
  '^[0-9]{4}$',  // Germany 
  '^08[0-9]{1} [0-9]{6}$',  // Greece 
  '^(1800|1850|1550) [0-9]{3} [0-9]{3}$',  // Hungary 
  'Variable length, no fixed convention',  // Iceland 
  '^06-[0-9]{8}$',  // Ireland 
  '^14 [0-9]{2}$',  // Italy
  '^[+]{1}31 [0-9]{2} [0-9]{7,9}$',  // Netherlands
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Norway
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',  // Poland
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',  // Portugal
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',  // Romania
  '^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$',  // Russia
];

const europeanLocalPatternName = 'mobile';
const europeanInternationalPatterns = [
  null, // Belgium
  null, // Denmark
  null, // Finland
  null, // France
  '^[+]{1}49 [0-9]{4} [0-9]{6,8}$', // Germany
  '^[+]{1}30 [0-9]{3} [0-9]{7,8}$', // Greece
  null,  //  Hungary 
  null,  // Iceland
  '^[0-9]{3} [0-9]{4}$',  // Ireland  
  '^[+]{1}353 [0-9]{2} [0-9]{5,7}$',  // Italy 
  null,  // Netherlands 
  '^[+]{1}31 [0-9]{2} [0-9]{7,9}$',  // Norway 
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',  // Poland
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',  // Portugal 
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',  // Romania 
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',  // Russia 
];

const europeanInternationalPatternName = 'service';

const europeanFormatObject = createPhoneNumberFormats(
  europeContinent,
  europeanCountries,
  europeanCountryCodes,
  europeanFixedLinePatterns,
  europeanFixedLinePatternName,
  europeanLocalPatterns,
  europeanLocalPatternName,
  europeanInternationalPatterns,
  europeanInternationalPatternName
);

writeToJsonFile(europeanFormatObject);
// Information for North America
const northAmericaContinent = 'North America';
const northAmericanCountries = ['Canada', 'United States', 'Mexico'];
const northAmericanCountryCodes = ['1', '1', '52'];

// Patterns for Canada
const northAmericaFixedLinePatterns = [
  '^\\d3\\d{3}-\\d{4}$', // Canada
  '^\\d3\\d{3}-\\d{4}$', // United States
  '^\\d{2}\\d{4} \\d{4}$' // Mexico
];
const northAmericaFixedLinePatternName = 'landline';
const northAmericaLocalPatterns = [
  '^\\d3\\d{3}-\\d{4}$', //Canada
 ' ^\\d3\\d{3}-\\d{4}$', //United States
  '^\\d{2} \\d{4} \\d{4}$']; //Mexico
const northAmericaLocalPatternName = 'mobile';
const northAmericaLandLinePatterns = [
  '^1-800-\\d{2}-\\d{4}$', //Canada
   null, //United States
   '^1-888-\\d{3}-\\d{4}$']; //Mexico
const northAmericaLandLinePatternName = 'toll-free';
const northAmericaInternationalPatterns= [
  '^\\+1\\d{10}$', //Canada
  '^\\+1\\d{10}$', //United States
  '^1-800-\\d{2}-\\d{4}$']; //Mexico
const northAmericaInternationalPatternName = 'service';
const northAmericaFormatObject = createPhoneNumberFormats(
  northAmericaContinent,
  northAmericanCountries,
  northAmericanCountryCodes,
  northAmericaFixedLinePatterns,
  northAmericaFixedLinePatternName,
  northAmericaLocalPatterns,
  northAmericaLocalPatternName,
  northAmericaLandLinePatterns,
  northAmericaLandLinePatternName,
  northAmericaInternationalPatterns,
  northAmericaInternationalPatternName
);

writeToJsonFile(northAmericaFormatObject);
// Information for Central America
const centralAmericaContinent = 'Central America';
const centralAmericanCountries = ['Costa Rica', 'El Salvador', 'Guatemala', 'Honduras'];
const centralAmericanCountryCodes = ['506', '503', '502', '504'];

// Patterns for Central America
const centralAmericaFixedLinePatterns = [
  '^2\\d3}-\\d4}$', // Costa Rica
  '^2\\d3}-\\d4}$',// El Salvador
  "^2\\d3}-\\d4}$", // Guatemala
  '^\\d3}-\\d4}$' // Honduras 
];
const centralAmericaFixedLinePatternName = 'landline';
const centralAmericaLocalPatterns = [
  '^2\\d{3}-\\d{4}$', // Costa Rica
  '^2\\d{3}-\\d{4}$', // El Salvador
  '^2\\d{3}-\\d{4}$', // Guatemala
  ' ^\\d{3}-\\d{4}$' // Honduras 
  
  ];
const centralAmericaLocalPatternName = 'mobile';
const centralAmericaLandLinePatterns = [
  ' ^800-\\d{3}-\\d{4}$', // Costa Rica
  null, // El Salvador
  null, // Guatemala
  null, // Honduras
];
const centralAmericaLandLinePatternName = 'toll-free';
const centralAmericaInternationalPatterns = [
  '^90\\d-\\d{3}-\\d{4}$', // Costa Rica
  "^9\\d-\\d{3}-\\d{4}$", // El Salvador
  "^+52 \\d{1,2} \\d{4} \\d{4}$", // Guatemala
  null, // Honduras
];
const centralAmericaInternationalPatternName = 'service';
const centralAmericaFormatObject = createPhoneNumberFormats(
  centralAmericaContinent,
  centralAmericanCountries,
  centralAmericanCountryCodes,
  centralAmericaFixedLinePatterns,
  centralAmericaFixedLinePatternName,
  centralAmericaLocalPatterns,
  centralAmericaLocalPatternName,
  centralAmericaLandLinePatterns,
  centralAmericaLandLinePatternName,
  centralAmericaInternationalPatterns,
  centralAmericaInternationalPatternName
);


writeToJsonFile(centralAmericaFormatObject);
// Information for South America
const southAmericaContinent = 'South America';
const southAmericanCountries = ['Argentina', 'Brazil', 'Peru'];
const southAmericanCountryCodes = ['54', '55', '51'];

// Patterns for Argentina
const southAmericaFixedLinePatterns = [
  '^0\d1,4\d{4}-\d{4}$', // Argentina
  '^\d{2}\d{4}-\d{4}$', // Brazil
  '^\d2\d{2}-\d{4}$']; // Peru
const southAmericaFixedLinePatternName = 'landline';
const southAmericaMobilePatterns = [
  '^15\\d{6,8}$', // Argentina
  '^\d{2} 9\d{4,5}-\d{4}$', // Brazil
  '^9\d{8}$' // Peru

];
const southAmericaMobilePatternName = 'mobile';
const southAmericaSpecialNumberPatterns = [
  '^0800 \d{3} \d{4}$', // Argentina
  null, // Brazil
  null, // Peru
];
const southAmericaSpecialNumberPatternName = 'service';
const southAmericaFormatObject = createPhoneNumberFormats(
  southAmericaContinent,
  southAmericanCountries,
  southAmericanCountryCodes,
  southAmericaFixedLinePatterns,
  southAmericaFixedLinePatternName,
  southAmericaMobilePatterns,
  southAmericaMobilePatternName,
  southAmericaSpecialNumberPatterns,
  southAmericaSpecialNumberPatternName
);



writeToJsonFile(southAmericaFormatObject);