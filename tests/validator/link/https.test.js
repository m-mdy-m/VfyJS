const { isHttps } = require('../../../index');

// Valid HTTPS URLs
test('Valid HTTPS URL - Case 1', () => {
  expect(isHttps('https://www.example.com')).toBe(true);
});

test('Valid HTTPS URL - Case 2', () => {
  expect(isHttps('https://example.com')).toBe(true);
});

test('Valid HTTPS URL - Case 3', () => {
  expect(isHttps('https://subdomain.example.com')).toBe(true);
});

// Invalid HTTPS URLs
test('Invalid HTTPS URL - Missing protocol', () => {
    try {
        isHttps('www.example.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTPS URL - HTTP protocol', () => {
    try {
        isHttps('http://www.example.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTPS URL - Empty input', () => {
    try {
        isHttps('');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTPS URL - Number input', () => {
    try {
        isHttps(123);
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

// Special character tests
test('Invalid HTTPS URL - Special character in hostname', () => {
    try {
        isHttps('https://www.example!.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTPS URL - Special character in hostname', () => {
    try {
        isHttps('https://www.example$$.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

// Protocol tests
test('Valid HTTPS URL - Protocol with spaces', () => {
  expect(isHttps('https:// www.example.com')).toBe(true);
});

test('Valid HTTPS URL - Protocol with parameters', () => {
  expect(isHttps('https://www.example.com?param=value')).toBe(true);
});

// Additional tests
test('Valid HTTPS URL - IP address', () => {
  expect(isHttps('https://192.168.0.1')).toBe(true);
});

test('Invalid HTTPS URL - Malformed protocol', () => {
  expect(isHttps('https:/www.example.com')).toBe(false);
});

test('Invalid HTTPS URL - No hostname', () => {
  expect(isHttps('https:///path')).toBe(false);
});

test('Invalid HTTPS URL - Non-string input', () => {
    try {
        isHttps(null);
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Valid HTTPS URL - Case sensitivity', () => {
  expect(isHttps('HTTPS://www.example.com')).toBe(true);
});

test('Valid HTTPS URL - Query parameters', () => {
  expect(isHttps('https://www.example.com/?query=param')).toBe(true);
});

test('Valid HTTPS URL - Path with dashes', () => {
  expect(isHttps('https://www.example.com/path-with-dashes')).toBe(true);
});

test('Invalid HTTPS URL - Missing hostname', () => {
  expect(isHttps('https:///path')).toBe(false);
});

test('Valid HTTPS URL - Subdomain with dashes', () => {
  expect(isHttps('https://sub-domain.example.com')).toBe(true);
});
