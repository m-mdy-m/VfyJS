exports.iran = (values) => {
    const code = values.code;
    const phone = values.phone;
    const patterns = values.patterns;
    let mobileFormat = `0${phone}`;
    let serviceFormat = `+${code}0${phone}`;
    let landline = `0${phone}`;
    const iso = values.iso;
    const hasCode = values.hasCode;
    const hasPhone = values.hasPhone;
  
    const results = patterns.map((patternObj, index) => {
      const regex = new RegExp(patternObj.pattern);
      const testResult = regex.test(
        index === 0 ? mobileFormat : index === 1 ? serviceFormat : landline
      );
      return testResult;
    });
  
    if (results.every((result) => result)) {
      const isValid = {
        continent: values.continent,
        country: values.country,
        code: values.code,
        isoCode: iso,
        phone: phone,
        isValidMobileFormat: results[0],
        isValidServiceFormat: results[1],
        isValidLandlineFormat: results[2],
        hasCode: hasCode,
        hasPhone: hasPhone,
        isDuplicateCode: false,
      };
      return isValid;
    } else {
      const isNotValid = {
        continent: values.continent,
        country: values.country,
        code: values.code,
        isoCode: iso,
        phone: phone,
        isValidMobileFormat: results[0],
        isValidServiceFormat: results[1],
        isValidLandlineFormat: results[2],
        hasCode: hasCode,
        hasPhone: hasPhone,
        isDuplicateCode: false,
      };
      return isNotValid;
    }
  };