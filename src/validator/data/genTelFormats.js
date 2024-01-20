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
const asianCountries = ['China','Hong Kong and Macau','India','Iran','Japan','Malaysia','Pakistan','Philippines','Singapore','Sri Lanka','South Korea','Taiwan','Thailand'];
const asianCountryCodes = ['86','852','91','98','81','60','92','63','65','94','82','886','66'];
const asianFixedLinePatterns = ['^\\(0\\d{2,3}\\) \\d{7,8}$','^\\d{4} \\d{4}$',"^\\d{3,4}-\\d{6,7}$","^0\\d{2} \\d{8}$","^0\\d{2}-\\d{4}-\\d{4}$","^0\\d{1,2}-\\d{7,8}$","^0\\d{2}-\\d{7,8}$","^\\d{11}$","^\\(\\d{3}\\) \\d{1} \\d{6}$","^0\\d{1,3}-\\d{3,4}-\\d{4}$","^\\(\\d{2}\\) \\d{4} \\d{4}$","^\\d{4} \\d{4}$",]
const asianFixedLinePatternName = 'landline'
const asianLocalPatterns = ['^1[3-9]\\d{9}$',null,"^9[1-9]\\d{9}$","^09\\d{9}$","^(0120|0570|0800)-\\d{2}-\\d{4}$","^01\\d{1}-\\d{6,8}$",null,"^(\\+63|0)\\d{10}$","^\\d{3} \\d{7}$","^01\\d{1}-\\d{4}-\\d{4}$","^0 \\d{3} \\d{4}$",]
const asianLocalPatternName = 'mobile'
const asianLandLinePatterns = ['^(800|400) \\d{4} \\d{4}$',null,"^1800 \\d{6}$",null,null,"^1-800-\\d{2}-\\d{4}$",null,null,null,"^070-\\d{4}-\\d{4}$","^09\\d{2} \\d{6}$",null,]
const asianLandLinePatternName = 'toll-free"'
const asianInternationalPatterns = ['^\\d{3,5}$',null,"^\\d{3,4}$","^\\+98 (0\\d{2}|09) \\d{8}$","^1[12]$", "^1-300-\\d{2}-\\d{4}$",null,null,"^\\+94 (\\d{3} \\d{1}|\\d{3}) \\d{6}$","^1[12]{2}$",null,"^\\+66 \\d{4} \\d{4}$",]
const asianInternationalPatternNam = 'service'
const asianFormatObject = createPhoneNumberFormats(asiaContinent,asianCountries,asianCountryCodes,asianFixedLinePatterns,asianFixedLinePatternName,asianLandLinePatterns,asianLandLinePatternName,asianLocalPatterns,asianLocalPatternName,asianInternationalPatterns,asianInternationalPatternNam)
writeToJsonFile(asianFormatObject)


// Information for Oceania
const oceaniaContinent = 'Oceania';
const oceaniaCountries = ['Australia', 'New Zealand'];
const oceaniaCountryCodes = ['61', '64'];

// Patterns for Australia
const oceaniaFixedLinePatternsAustralia = ['^(0[2378])?\\d{8}$', '^\\d{4} \\d{4}$', "^\\d{3,4}-\\d{6,7}$", "^0\\d{2} \\d{8}$", "^0\\d{2}-\\d{4}-\\d{4}$", "^0\\d{1,2}-\\d{7,8}$", "^0\\d{2}-\\d{7,8}$", "^\\d{11}$", "^\\(\\d{3}\\) \\d{1} \\d{6}$", "^0\\d{1,3}-\\d{3,4}-\\d{4}$", "^\\(\\d{2}\\) \\d{4} \\d{4}$", "^\\d{4} \\d{4}$"];
const oceaniaFixedLinePatternNameAustralia = 'landline';
const oceaniaLocalPatternsAustralia = ['^1[3-9]\\d{9}$', null, "^9[1-9]\\d{9}$", "^09\\d{9}$", "^(0120|0570|0800)-\\d{2}-\\d{4}$", "^01\\d{1}-\\d{6,8}$", null, "^(\\+63|0)\\d{10}$", "^\\d{3} \\d{7}$", "^01\\d{1}-\\d{4}-\\d{4}$", "^0 \\d{3} \\d{4}$"];
const oceaniaLocalPatternNameAustralia = 'mobile';
const oceaniaLandLinePatternsAustralia = ['^(800|400) \\d{4} \\d{4}$', null, "^1800 \\d{6}$", null, null, "^1-800-\\d{2}-\\d{4}$", null, null, null, "^070-\\d{4}-\\d{4}$", "^09\\d{2} \\d{6}$", null];
const oceaniaLandLinePatternNameAustralia = 'toll-free';
const oceaniaInternationalPatternsAustralia = ['^\\d{3,5}$', null, "^\\d{3,4}$", "^\\+61\\d{8}$", "^1[12]$", "^19\\d{6}$"];
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
  '^0[0-9]{1}[0-9]{1} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^0[0-9]{1}-[0-9]{3} [0-9]{3} [0-9]{2}$',
  '^0[1-9]{1} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^0[0-9]{3} [0-9]{6,8}(-[0-9]{2})?$',
  '^[0-9]{3} [0-9]{7,8}$',
  '^[0-9]{2} [0-9]{6}$',
  '^[0-9]{3} [0-9]{4}$',
  '^[0-9]{2,3} [0-9]{5,7}$',
  'Variable length, no fixed convention',
  '^0[0-9]{1,2}-[0-9]{7,9}$',
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[+]{1}7 [(]{1}[0-9]{3}[)]{1} [0-9]{3}-[0-9]{2}-[0-9]{2}$'
];

const europeanFixedLinePatternName = 'landline';

const europeanLocalPatterns = [
  '^04[0-9]{1} [0-9]{2} [0-9]{2} [0-9]{2}$',
  null,
  '^0[7-9]{1}[0-9]{1}-[0-9]{3} [0-9]{2} [0-9]{2}$',
  '^06 [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^[0-9]{4}$',
  '^08[0-9]{1} [0-9]{6}$',
  '^(1800|1850|1550) [0-9]{3} [0-9]{3}$',
  'Variable length, no fixed convention',
  '^06-[0-9]{8}$',
  '^14 [0-9]{2}$',
  '^[+]{1}31 [0-9]{2} [0-9]{7,9}$',
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[+]{1}7 [(]{1}[0-9]{3}[)]{1} [0-9]{3}-[0-9]{2}-[0-9]{2}$'
];

const europeanLocalPatternName = 'mobile';

const europeanLandLinePatterns = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

const europeanLandLinePatternName = 'toll-free';

const europeanInternationalPatterns = [
  null,
  null,
  null,
  null,
  '^[+]{1}49 [0-9]{4} [0-9]{6,8}$',
  '^[+]{1}30 [0-9]{3} [0-9]{7,8}$',
  null,
  null,
  '^[0-9]{3} [0-9]{4}$',
  '^[+]{1}353 [0-9]{2} [0-9]{5,7}$',
  'Variable length, no fixed convention',
  '^[+]{1}31 [0-9]{2} [0-9]{7,9}$',
  '^[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3} [0-9]{3} [0-9]{3}$',
  '^[0-9]{4}-[0-9]{3}-[0-9]{3}$',
  '^[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[0-9]{3}-[0-9]{2}-[0-9]{2}$',
  '^[+]{1}7 [(]{1}[0-9]{3}[)]{1} [0-9]{3}-[0-9]{2}-[0-9]{2}$'
];

const europeanInternationalPatternName = 'service';

const europeanFormatObject = createPhoneNumberFormats(
  europeContinent,
  europeanCountries,
  europeanCountryCodes,
  europeanFixedLinePatterns,
  europeanFixedLinePatternName,
  europeanLandLinePatterns,
  europeanLandLinePatternName,
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
const northAmericaFixedLinePatternsCanada = ['^\\(\\d{3}\\) \\d{3}-\\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^\\(\\d{2}\\) \\d{4}-\\d{4}$'];
const northAmericaFixedLinePatternNameCanada = 'landline';
const northAmericaLocalPatternsCanada = ['^\\(\\d{3}\\) \\d{3}-\\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^\\(\\d{2}\\) \\d{4}-\\d{4}$'];
const northAmericaLocalPatternNameCanada = 'mobile';
const northAmericaLandLinePatternsCanada = ['^1-800-\\d{2}-\\d{4}$', null, '^1-888-\\d{3}-\\d{4}$'];
const northAmericaLandLinePatternNameCanada = 'toll-free';
const northAmericaInternationalPatternsCanada = ['^\\+1 \\d{10}$', '^1-800-\\d{2}-\\d{4}$', '^\\+1 \\d{1,3} \\d{3} \\d{4}$'];
const northAmericaInternationalPatternNameCanada = 'service';
const northAmericaFormatObjectCanada = createPhoneNumberFormats(
  northAmericaContinent,
  ['Canada'],
  ['1'],
  northAmericaFixedLinePatternsCanada,
  northAmericaFixedLinePatternNameCanada,
  northAmericaLandLinePatternsCanada,
  northAmericaLandLinePatternNameCanada,
  northAmericaLocalPatternsCanada,
  northAmericaLocalPatternNameCanada,
  northAmericaInternationalPatternsCanada,
  northAmericaInternationalPatternNameCanada
);

// Patterns for United States
const northAmericaFixedLinePatternsUS = ['^\\(\\d{3}\\) \\d{3}-\\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^1 \\d{3}-\\d{3}-\\d{4}$'];
const northAmericaFixedLinePatternNameUS = 'landline';
const northAmericaLocalPatternsUS = ['^\\(\\d{3}\\) \\d{3}-\\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^1 \\d{3}-\\d{3}-\\d{4}$'];
const northAmericaLocalPatternNameUS = 'mobile';
const northAmericaLandLinePatternsUS = ['^1-800-\\d{2}-\\d{4}$', null, '^1-888-\\d{3}-\\d{4}$'];
const northAmericaLandLinePatternNameUS = 'toll-free';
const northAmericaInternationalPatternsUS = ['^\\+1 \\d{10}$', '^1-800-\\d{2}-\\d{4}$', '^\\+1 \\d{1,3} \\d{3} \\d{4}$'];
const northAmericaInternationalPatternNameUS = 'service';
const northAmericaFormatObjectUS = createPhoneNumberFormats(
  northAmericaContinent,
  ['United States'],
  ['1'],
  northAmericaFixedLinePatternsUS,
  northAmericaFixedLinePatternNameUS,
  northAmericaLandLinePatternsUS,
  northAmericaLandLinePatternNameUS,
  northAmericaLocalPatternsUS,
  northAmericaLocalPatternNameUS,
  northAmericaInternationalPatternsUS,
  northAmericaInternationalPatternNameUS
);

// Patterns for Mexico
const northAmericaFixedLinePatternsMexico = ['^\\d{2} \\d{4} \\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^\\d{3} \\d{3} \\d{4}$'];
const northAmericaFixedLinePatternNameMexico = 'landline';
const northAmericaLocalPatternsMexico = ['^\\d{2} \\d{4} \\d{4}$', '^[2-9]\\d{2}-\\d{3}-\\d{4}$', '^\\d{3} \\d{3} \\d{4}$'];
const northAmericaLocalPatternNameMexico = 'mobile';
const northAmericaLandLinePatternsMexico = ['^1-800-\\d{2}-\\d{4}$', null, '^1-888-\\d{3}-\\d{4}$'];
const northAmericaLandLinePatternNameMexico = 'toll-free';
const northAmericaInternationalPatternsMexico = ['^\\+52 \\d{1,2} \\d{4} \\d{4}$', '^1-800-\\d{2}-\\d{4}$', '^\\+52 \\d{1,2} \\d{3} \\d{4}$'];
const northAmericaInternationalPatternNameMexico = 'service';
const northAmericaFormatObjectMexico = createPhoneNumberFormats(
  northAmericaContinent,
  ['Mexico'],
  ['52'],
  northAmericaFixedLinePatternsMexico,
  northAmericaFixedLinePatternNameMexico,
  northAmericaLandLinePatternsMexico,
  northAmericaLandLinePatternNameMexico,
  northAmericaLocalPatternsMexico,
  northAmericaLocalPatternNameMexico,
  northAmericaInternationalPatternsMexico,
  northAmericaInternationalPatternNameMexico
);

// Combine all North American formats
const northAmericaFormatObject = [
  ...northAmericaFormatObjectCanada,
  ...northAmericaFormatObjectUS,
  ...northAmericaFormatObjectMexico
];

writeToJsonFile(northAmericaFormatObject);
// Information for Central America
const centralAmericaContinent = 'Central America';
const centralAmericanCountries = ['Costa Rica', 'El Salvador', 'Guatemala', 'Honduras'];
const centralAmericanCountryCodes = ['506', '503', '502', '504'];

// Patterns for Costa Rica
const centralAmericaFixedLinePatternsCostaRica = ['^2\\d{3}-\\d{4}$'];
const centralAmericaFixedLinePatternNameCostaRica = 'landline';
const centralAmericaLocalPatternsCostaRica = ['^2\\d{3}-\\d{4}$', '^8\\d{3}-\\d{4}$', '^6\\d{3}-\\d{4}$', '^7\\d{3}-\\d{4}$'];
const centralAmericaLocalPatternNameCostaRica = 'mobile';
const centralAmericaLandLinePatternsCostaRica = ['^800-\\d{3}-\\d{4}$'];
const centralAmericaLandLinePatternNameCostaRica = 'toll-free';
const centralAmericaInternationalPatternsCostaRica = ['^90\\d-\\d{3}-\\d{4}$'];
const centralAmericaInternationalPatternNameCostaRica = 'service';
const centralAmericaFormatObjectCostaRica = createPhoneNumberFormats(
  centralAmericaContinent,
  ['Costa Rica'],
  ['506'],
  centralAmericaFixedLinePatternsCostaRica,
  centralAmericaFixedLinePatternNameCostaRica,
  centralAmericaLandLinePatternsCostaRica,
  centralAmericaLandLinePatternNameCostaRica,
  centralAmericaLocalPatternsCostaRica,
  centralAmericaLocalPatternNameCostaRica,
  centralAmericaInternationalPatternsCostaRica,
  centralAmericaInternationalPatternNameCostaRica
);

// Patterns for El Salvador
const centralAmericaFixedLinePatternsElSalvador = ['^2\\d{3}-\\d{4}$'];
const centralAmericaFixedLinePatternNameElSalvador = 'landline';
const centralAmericaLocalPatternsElSalvador = ['^2\\d{3}-\\d{4}$', '^7\\d{3}-\\d{4}$'];
const centralAmericaLocalPatternNameElSalvador = 'mobile';
const centralAmericaLandLinePatternsElSalvador = [];
const centralAmericaLandLinePatternNameElSalvador = 'toll-free';
const centralAmericaInternationalPatternsElSalvador = ['^9\\d-\\d{3}-\\d{4}$'];
const centralAmericaInternationalPatternNameElSalvador = 'service';
const centralAmericaFormatObjectElSalvador = createPhoneNumberFormats(
  centralAmericaContinent,
  ['El Salvador'],
  ['503'],
  centralAmericaFixedLinePatternsElSalvador,
  centralAmericaFixedLinePatternNameElSalvador,
  centralAmericaLandLinePatternsElSalvador,
  centralAmericaLandLinePatternNameElSalvador,
  centralAmericaLocalPatternsElSalvador,
  centralAmericaLocalPatternNameElSalvador,
  centralAmericaInternationalPatternsElSalvador,
  centralAmericaInternationalPatternNameElSalvador
);

// Patterns for Guatemala
const centralAmericaFixedLinePatternsGuatemala = ['^2\\d{3}-\\d{4}$', '^6\\d{3}-\\d{4}$', '^7\\d{3}-\\d{4}$'];
const centralAmericaFixedLinePatternNameGuatemala = 'landline';
const centralAmericaLocalPatternsGuatemala = ['^2\\d{3}-\\d{4}$', '^6\\d{3}-\\d{4}$', '^7\\d{3}-\\d{4}$', '^5\\d{3}-\\d{4}$', '^4\\d{3}-\\d{4}$', '^3\\d{3}-\\d{4}$'];
const centralAmericaLocalPatternNameGuatemala = 'mobile';
const centralAmericaLandLinePatternsGuatemala = [];
const centralAmericaLandLinePatternNameGuatemala = 'toll-free';
const centralAmericaInternationalPatternsGuatemala = ['^\\+52 \\d{1,2} \\d{4} \\d{4}$', '^1-800-\\d{2}-\\d{4}$', '^\\+52 \\d{1,2} \\d{3} \\d{4}$'];
const centralAmericaInternationalPatternNameGuatemala = 'service';
const centralAmericaFormatObjectGuatemala = createPhoneNumberFormats(
  centralAmericaContinent,
  ['Guatemala'],
  ['502'],
  centralAmericaFixedLinePatternsGuatemala,
  centralAmericaFixedLinePatternNameGuatemala,
  centralAmericaLandLinePatternsGuatemala,
  centralAmericaLandLinePatternNameGuatemala,
  centralAmericaLocalPatternsGuatemala,
  centralAmericaLocalPatternNameGuatemala,
  centralAmericaInternationalPatternsGuatemala,
  centralAmericaInternationalPatternNameGuatemala
);

// Patterns for Honduras
const centralAmericaFixedLinePatternsHonduras = ['^\\d{3}-\\d{4}$'];
const centralAmericaFixedLinePatternNameHonduras = 'landline';
const centralAmericaLocalPatternsHonduras = ['^\\d{3}-\\d{4}$', '^\\d{4}-\\d{4}$'];
const centralAmericaLocalPatternNameHonduras = 'mobile';
const centralAmericaLandLinePatternsHonduras = [];
const centralAmericaLandLinePatternNameHonduras = 'toll-free';
const centralAmericaInternationalPatternsHonduras = [];
const centralAmericaInternationalPatternNameHonduras = 'service';
const centralAmericaFormatObjectHonduras = createPhoneNumberFormats(
  centralAmericaContinent,
  ['Honduras'],
  ['504'],
  centralAmericaFixedLinePatternsHonduras,
  centralAmericaFixedLinePatternNameHonduras,
  centralAmericaLandLinePatternsHonduras,
  centralAmericaLandLinePatternNameHonduras,
  centralAmericaLocalPatternsHonduras,
  centralAmericaLocalPatternNameHonduras,
  centralAmericaInternationalPatternsHonduras,
  centralAmericaInternationalPatternNameHonduras
);

// Combine all Central American formats
const centralAmericaFormatObject = [
  ...centralAmericaFormatObjectCostaRica,
  ...centralAmericaFormatObjectElSalvador,
  ...centralAmericaFormatObjectGuatemala,
  ...centralAmericaFormatObjectHonduras
];

writeToJsonFile(centralAmericaFormatObject);
// Information for South America
const southAmericaContinent = 'South America';
const southAmericanCountries = ['Argentina', 'Brazil', 'Peru'];
const southAmericanCountryCodes = ['54', '55', '51'];

// Patterns for Argentina
const southAmericaFixedLinePatternsArgentina = ['^\\(0\\d{1,4}\\) \\d{4}-\\d{4}$', '^\\(0\\d{3,4}\\) \\d{3}-\\d{4}$', '^\\(0\\d{4}\\) \\d{2}-\\d{4}$'];
const southAmericaFixedLinePatternNameArgentina = 'landline';
const southAmericaMobilePatternsArgentina = ['^15\\d{6,8}$', '^\\(0\\d{2}\\) 15\\d{6,8}$', '^\\(0\\d{3}\\) 15\\d{6,8}$'];
const southAmericaMobilePatternNameArgentina = 'mobile';
const southAmericaSpecialNumberPatternsArgentina = ['^0800 \\d{3} \\d{4}$', '^0810 \\d{3} \\d{4}$', '^0600 \\d{3} \\d{4}$'];
const southAmericaSpecialNumberPatternNameArgentina = 'service';
const southAmericaFormatObjectArgentina = createPhoneNumberFormats(
  southAmericaContinent,
  ['Argentina'],
  ['54'],
  southAmericaFixedLinePatternsArgentina,
  southAmericaFixedLinePatternNameArgentina,
  southAmericaMobilePatternsArgentina,
  southAmericaMobilePatternNameArgentina,
  southAmericaSpecialNumberPatternsArgentina,
  southAmericaSpecialNumberPatternNameArgentina
);

// Patterns for Brazil
const southAmericaFixedLinePatternsBrazil = ['^\\d{2} \\d{4}-\\d{4}$'];
const southAmericaFixedLinePatternNameBrazil = 'landline';
const southAmericaMobilePatternsBrazil = ['^\\d{2} 9\\d{4,5}-\\d{4}$'];
const southAmericaMobilePatternNameBrazil = 'mobile';
const southAmericaFormatObjectBrazil = createPhoneNumberFormats(
  southAmericaContinent,
  ['Brazil'],
  ['55'],
  southAmericaFixedLinePatternsBrazil,
  southAmericaFixedLinePatternNameBrazil,
  southAmericaMobilePatternsBrazil,
  southAmericaMobilePatternNameBrazil
);

// Patterns for Peru
const southAmericaFixedLinePatternsPeru = ['^\\(\\d{2}\\) \\d{2}-\\d{4}$'];
const southAmericaFixedLinePatternNamePeru = 'landline';
const southAmericaMobilePatternsPeru = ['^9\\d{8}$', '^\\(\\d{2}\\) 9\\d{8}$'];
const southAmericaMobilePatternNamePeru = 'mobile';
const southAmericaFormatObjectPeru = createPhoneNumberFormats(
  southAmericaContinent,
  ['Peru'],
  ['51'],
  southAmericaFixedLinePatternsPeru,
  southAmericaFixedLinePatternNamePeru,
  southAmericaMobilePatternsPeru,
  southAmericaMobilePatternNamePeru
);

// Combine all South American formats
const southAmericaFormatObject = [
  ...southAmericaFormatObjectArgentina,
  ...southAmericaFormatObjectBrazil,
  ...southAmericaFormatObjectPeru
];

writeToJsonFile(southAmericaFormatObject);