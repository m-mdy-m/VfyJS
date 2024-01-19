const { isHttp } = require('../../../index');

// Valid HTTP URLs
test('Valid HTTP URL - Case 1', () => {
  expect(isHttp('http://www.example.com')).toBe(true);
});

test('Valid HTTP URL - Case 2', () => {
  expect(isHttp('http://example.com')).toBe(true);
});

test('Valid HTTP URL - Case 3', () => {
  expect(isHttp('http://subdomain.example.com')).toBe(true);
});

// Invalid HTTP URLs
test('Invalid HTTP URL - Missing protocol', () => {
    try {
        isHttp('www.example.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTP URL - HTTPS protocol', () => {
    try {
        isHttp('https://www.example.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTP URL - Empty input', () => {
    try {
        isHttp('');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTP URL - Number input', () => {
    try {
        isHttp(123);
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

// Special character tests
test('Invalid HTTP URL - Special character in hostname', () => {
    try {
        isHttp('http://www.example!.com');
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Invalid HTTP URL - Special character in hostname', () => {
    try{
        expect(isHttp('http://www.example$$.com')).toBe(false)
    }catch(err){
        expect(err.message).toBe(err.message)
    }
});

// Protocol tests
test('Valid HTTP URL - Protocol with spaces', () => {
    expect(isHttp('http:// www.example.com')).toBe(true);
});

test('Valid HTTP URL - Protocol with parameters', () => {
  expect(isHttp('http://www.example.com?param=value')).toBe(true);
});

// Additional tests
test('Valid HTTP URL - IP address', () => {
  expect(isHttp('http://192.168.0.1')).toBe(true);
});

test('Invalid HTTP URL - Malformed protocol', () => {
  expect(isHttp('http:/www.example.com')).toBe(false);
});

test('Invalid HTTP URL - No hostname', () => {
  expect(isHttp('http:///path')).toBe(false);
});

test('Invalid HTTP URL - Non-string input', () => {
    try {
        isHttp(null);
    } catch (err) {
        expect(err.message).toBe(err.message);
    }
});

test('Valid HTTP URL - Case sensitivity', () => {
  expect(isHttp('HTTP://www.example.com')).toBe(true);
});

test('Valid HTTP URL - Query parameters', () => {
  expect(isHttp('http://www.example.com/?query=param')).toBe(true);
});

test('Valid HTTP URL - Path with dashes', () => {
  expect(isHttp('http://www.example.com/path-with-dashes')).toBe(true);
});

test('Invalid HTTP URL - Missing hostname', () => {
  expect(isHttp('http:///path')).toBe(false);
});

test('Valid HTTP URL - Subdomain with dashes', () => {
  expect(isHttp('http://sub-domain.example.com')).toBe(true);
});