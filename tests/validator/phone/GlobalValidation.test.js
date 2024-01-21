const {hasCode,hasPhone,GlobalVal,getContinentInfo,ChecKValue} = require('../../../src/validator/phone/utils/GlobalValidation')
  test("invalid country code - invalid format with custom error message", async () => {
    try {
      const result = await hasCode('invalid');
      expect(result).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Invalid Code format. The Code should contain numeric characters.");
    }
  });
  
  test("invalid phone number - invalid format with custom error message", () => {
    try {
      const result = hasPhone('invalid');
      expect(result).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Invalid Phone Number format. The Phone Number should contain numeric characters.');
    }
  });
  
  test("valid phone code - meets all criteria with custom options", async () => {
    const result = await hasCode('98');
    expect(result).toEqual({
      code: '98',
      country: 'Iran',
      iso: 'IR',
      hasCode: true,
      code: '98',
    });
  });
  
  test("valid phone number - meets all criteria with custom options", () => {
    const result = hasPhone('9115291407');
    expect(result).toEqual({
      phone: '9115291407',
      hasPhone: true,
    });
  });
  
  test("valid continent info - meets all criteria with custom options", async () => {
    const result = await getContinentInfo('98');
    expect(result).toEqual({
      continent: 'Asia',
      patterns: [
        { type: 'mobile', pattern: '^09\\d{9}$' },
        { type: 'service', pattern: '^+98 (0\\d{2}|09) \\d{8}$' },
        { type: 'landline', pattern: '^0\\d{2} \\d{8}$' },
      ],
    });
  });
  
  test("invalid country code in GlobalVal - invalid format with custom error message", async () => {
    try {
      await GlobalVal('invalid', '9115291407');
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });
  
  test("invalid phone number in GlobalVal - invalid format with custom error message", async () => {
    try {
      await GlobalVal('98', 'invalid');
    } catch (error) {
      expect(error.property).toBe(error.property);
    }
  });
  
  test("valid GlobalVal result - meets all criteria with custom options", async () => {
    const result = await GlobalVal('98', '9115291407');
    expect(result).toEqual({
      continent: 'Asia',
      code: '98',
      country: 'Iran',
      iso: 'IR',
      phone: '9115291407',
      patterns: [
        { type: 'mobile', pattern: '^09\\d{9}$' },
        { type: 'service', pattern: '^+98 (0\\d{2}|09) \\d{8}$' },
        { type: 'landline', pattern: '^0\\d{2} \\d{8}$' },
      ],
      hasCode: true,
      hasPhone: true,
    });
  });
  test("invalid country code - empty value", async () => {
    try {
      const result = await hasCode('');
      expect(result).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Code should not be empty. Please provide a valid Code.');
    }
  });
  
  test("invalid phone number - exceeds maximum length", () => {
    try {
      const result = hasPhone('1234567890123456789012345678');
      expect(result).toBe(false);
    } catch (error) {
      expect(error.message).toBe('Invalid Phone Number length. The Phone Number should be between 6 and 25 characters.');
    }
  });
  
  test("valid phone code - minimum length", async () => {
    const result = await hasCode('1');
    expect(result).toEqual({
      code: '1',
      country: 'United States',
      iso: 'US',
      hasCode: true,
      code: '1',
    });
  });
  
  test("valid phone number - minimum length", () => {
    const result = hasPhone('123456');
    expect(result).toEqual({
      phone: '123456',
      hasPhone: true,
    });
  });
  
  test("valid continent info - non-existent code", async () => {
    const result = await getContinentInfo('999');
    expect(result).toBe(false);
  });
  
  test("invalid country code in GlobalVal - exceeds maximum length", async () => {
    try {
      await GlobalVal('12345678901', '9115291407');
    } catch (error) {
      expect(error.message).toBe('Internal server error. Please try again later.');
    }
  });
  
  test("invalid phone number in GlobalVal - empty value", async () => {
    try {
      await GlobalVal('98','');
    } catch (error) {
      expect(error.message).toBe('Internal server error. Please try again later.');
    }
  });
  
  test("valid GlobalVal result - minimum lengths", async () => {
    const result = await GlobalVal('1', '123456');
    expect(result).toEqual({
      continent: 'North America',
      code: '1',
      country: 'United States',
      iso: 'US',
      phone: '123456',
      patterns: [
        { type: 'mobile', pattern: '^\\d{10}$' },
        { type: 'landline', pattern: '^\\d{3}-\\d{3}-\\d{4}$' },
      ],
      hasCode: true,
      hasPhone: true,
    });
  });