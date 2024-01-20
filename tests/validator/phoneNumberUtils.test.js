const { phoneNumberUtils } = require("../../index");

// Test cases for invalid phone numbers without options
test("invalid phone number - empty code", async () => {
  await expect(
    async () => await phoneNumberUtils("", "1234567890")
  ).rejects.toThrowError("Code should not be empty");
});

test("invalid phone number - empty phone", async () => {
  await expect(
    async () => await phoneNumberUtils("1", "")
  ).rejects.toThrowError("Phone should not be empty");
});

test("invalid phone number - invalid code type", async () => {
  await expect(
    async () => await phoneNumberUtils(123, "1234567890")
  ).rejects.toThrowError("Code must be of type string or number");
});

test("invalid phone number - invalid phone type", async () => {
  await expect(
    async () => await phoneNumberUtils("1", 1234567890)
  ).rejects.toThrowError("Phone must be of type string or number");
});

test("invalid phone number - invalid country code", async () => {
  await expect(
    async () => await phoneNumberUtils("999", "1234567890")
  ).rejects.toThrowError("Country details not found for the provided code.");
});

test("invalid phone number - invalid phone format", async () => {
  await expect(
    async () => await phoneNumberUtils("1", "abcdefghij")
  ).rejects.toThrowError(
    "Invalid phone number format. Please check and try again."
  );
});

// Test cases for valid phone numbers without options
test("valid phone number - valid code and phone", async () => {
  const result = await phoneNumberUtils("1", "1234567890");
  expect(result).toEqual({
    country: "United States",
    countryCode: "1",
    numberType: "Mobile",
    numberPattern: "\\d{10}",
    inputPhoneNumber: "1234567890",
    formattedPhoneNumber: "+1-1234567890",
  });
});
test("invalid phone number - empty code with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils("", "1234567890")
  ).rejects.toThrowError("Custom error: Code should not be empty");
});

test("invalid phone number - empty phone with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils("1", "")
  ).rejects.toThrowError("Custom error: Phone should not be empty");
});

test("invalid phone number - invalid code type with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils(123, "1234567890")
  ).rejects.toThrowError("Custom error: Code must be of type string or number");
});

test("invalid phone number - invalid phone type with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils("1", 1234567890)
  ).rejects.toThrowError(
    "Custom error: Phone must be of type string or number"
  );
});

test("invalid phone number - invalid country code with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils("999", "1234567890")
  ).rejects.toThrowError(
    "Custom error: Country details not found for the provided code."
  );
});

test("invalid phone number - invalid phone format with custom error message", async () => {
  await expect(
    async () => await phoneNumberUtils("1", "abcdefghij")
  ).rejects.toThrowError(
    "Custom error: Invalid phone number format. Please check and try again."
  );
});

// Test cases for valid phone numbers with custom options
test("valid phone number - valid code and phone with custom options", async () => {
  const result = await phoneNumberUtils("44", "7912345678", { minLength: 10 });
  expect(result).toEqual({
    country: "United Kingdom",
    countryCode: "44",
    numberType: "Mobile",
    numberPattern: "\\d{10}",
    inputPhoneNumber: "7912345678",
    formattedPhoneNumber: "+44-7912345678",
  });
});

test("valid phone number - valid code and phone with different country code", async () => {
  const result = await phoneNumberUtils("33", "612345678");
  expect(result).toEqual({
    country: "France",
    countryCode: "33",
    numberType: "Mobile",
    numberPattern: "\\d{9}",
    inputPhoneNumber: "612345678",
    formattedPhoneNumber: "+33-612345678",
  });
});
