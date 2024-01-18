const {isColor} = require('../../index')
describe('isColor function tests', () => {
  // Valid Hex Color Tests
  test('Valid Hex Color - Short format', () => {
    const result = isColor('#abc');
    expect(result.isHEX).toBe(true);
  });

  test('Valid Hex Color - Long format', () => {
    const result = isColor('#abcdef');
    expect(result.isHEX).toBe(true);
  });

  test('Valid Hex Color with Alpha', () => {
    const result = isColor('#aabbccdd');
    expect(result.isHEX).toBe(true);
  });

  // Invalid Hex Color Tests
  test('Invalid Hex Color - Missing #', () => {
    const result = isColor('aabbcc');
    expect(result.isHEX).toBe(false);
  });

  test('Invalid Hex Color - Invalid characters', () => {
    const result = isColor('#ghijkl');
    expect(result.isHEX).toBe(false);
  });

  // Valid Named Color Test
  test('Valid Named Color', () => {
    const result = isColor('red');
    expect(result.isNameColor).toBe(true);
  });

  // Invalid Named Color Test
  test('Invalid Named Color - Numbers included', () => {
    const result = isColor('darkblue2');
    expect(result.isNameColor).toBe(false);
  });

  // Valid RGB Color Test
  test('Valid RGB Color', () => {
    const result = isColor('rgb(255, 0, 128)');
    expect(result.isRGB).toBe(true);
  });

  // Invalid RGB Color Tests
  test('Invalid RGB Color - Missing parentheses', () => {
    const result = isColor('rgb255, 0, 128');
    expect(result.isRGB).toBe(false);
  });

  test('Valid RGB Color - Valid value', () => {
    const result = isColor('rgb(255, 0, 300)');
    expect(result.isRGB).toBe(true);
  });

  // Valid RGBA Color Test
  test('Valid RGBA Color', () => {
    const result = isColor('rgba(255, 0, 128, 0.5)');
    expect(result.isRGBA).toBe(true);
  });

  // Invalid RGBA Color Tests
  test('Invalid RGBA Color - Missing parentheses', () => {
    const result = isColor('rgba255, 0, 128, 0.5');
    expect(result.isRGBA).toBe(false);
  });

  test('Valid RGBA Color - Valid alpha value', () => {
    const result = isColor('rgba(255, 0, 128, 1.5)');
    expect(result.isRGBA).toBe(true);
  });

  // Valid HSL Color Test
  test('Valid HSL Color', () => {
    const result = isColor('hsl(120, 100%, 50%)');
    expect(result.isHSL).toBe(true);
  });

  // Invalid HSL Color Tests
  test('Invalid HSL Color - Missing parentheses', () => {
    const result = isColor('hsl120, 100%, 50%');
    expect(result.isHSL).toBe(false);
  });

  test('Valid HSL Color - Valid saturation value', () => {
    const result = isColor('hsl(120, 150%, 50%)');
    expect(result.isHSL).toBe(true);
  });

  // Valid CSS Variable Test
  test('Valid CSS Variable', () => {
    const result = isColor('var(--main-color)');
    expect(result.isCssVar).toBe(true);
  });

  // Invalid CSS Variable Test
  test('Invalid CSS Variable - Missing var(--)', () => {
    const result = isColor('--main-color');
    expect(result.isCssVar).toBe(false);
  });

  // Valid HWB Color Test
  test('Valid HWB Color', () => {
    const result = isColor('hwb(180, 75%, 50%)');
    expect(result.isHWB).toBe(true);
  });

  // Invalid HWB Color Tests
  test('Invalid HWB Color - Missing parentheses', () => {
    const result = isColor('hwb180, 75%, 50%');
    expect(result.isHWB).toBe(false);
  });

  test('Valid HWB Color - Valid hue value', () => {
    const result = isColor('hwb(400, 75%, 50%)');
    expect(result.isHWB).toBe(true);
  });
});