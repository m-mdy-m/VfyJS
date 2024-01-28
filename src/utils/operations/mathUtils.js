/**
 * Represents a collection of mathematical operations on numbers.
 * @typedef {Object} MathOperations
 * @property {() => boolean} isEven - Checks if the base number is even.
 * @property {() => boolean} areAllOdd - Checks if all numbers (including the base number) are odd.
 * @property {() => boolean} isOdd - Checks if the base number is odd.
 * @property {() => boolean} areAllEven - Checks if all numbers (including the base number) are even.
 * @property {() => number} add - Adds all additional numbers to the base number.
 * @property {() => number} subtract - Subtracts all additional numbers from the base number.
 * @property {() => Object} isDivisibleBy - Checks if the base number is divisible by each additional number.
 * @property {() => number} multiply - Multiplies the base number by all additional numbers.
 * @property {() => number} divide - Divides the base number by all additional numbers.
 */

/**
 * Defines a MathOperations object with various mathematical operations.
 * @param {number} number - The base number for operations.
 * @param {...number} numbers - Additional numbers for operations.
 * @returns {MathOperations} An object containing various mathematical operations.
 * @example
 * const math = MathOperations(2, 3, 4, 5);
 * console.log(math.isEven()); // Output: true
 * console.log(math.areAllOdd()); // Output: false
 * console.log(math.isOdd()); // Output: true
 * console.log(math.areAllEven()); // Output: false
 * console.log(math.add()); // Output: 14 (2 + 3 + 4 + 5)
 * console.log(math.subtract()); // Output: -10 (2 - 3 - 4 - 5)
 * console.log(math.isDivisibleBy()); // Output: {3: false, 4: true, 5: false} (2 % 3, 2 % 4, 2 % 5)
 * console.log(math.multiply()); // Output: 120 (2 * 3 * 4 * 5)
 * console.log(math.divide()); // Output: 0.03333333333333333 (2 / 3 / 4 / 5)
 */
const MathOperations = (number, ...numbers) => ({
    /**
     * Checks if the base number is even.
     * @returns {boolean} True if the base number is even, false otherwise.
     */
    isEven: () => number % 2 === 0,
  
    /**
     * Checks if all numbers (including the base number) are odd.
     * @returns {boolean} True if all numbers are odd, false otherwise.
     */
    areAllOdd: () => [number, ...numbers].every((num) => num % 2 === 0),
  
    /**
     * Checks if the base number is odd.
     * @returns {boolean} True if the base number is odd, false otherwise.
     */
    isOdd: () => number % 2 !== 0,
  
    /**
     * Checks if all numbers (including the base number) are even.
     * @returns {boolean} True if all numbers are even, false otherwise.
     */
    areAllEven: () => [number, ...numbers].every((num) => num % 2 !== 0),
  
    /**
     * Adds all additional numbers to the base number.
     * @returns {number} The result of adding all numbers.
     */
    add: () => numbers.reduce((acc, curr) => acc + curr, number),
  
    /**
     * Subtracts all additional numbers from the base number.
     * @returns {number} The result of subtracting all numbers.
     */
    subtract: () => numbers.reduce((acc, curr) => acc - curr, number),
  
    /**
     * Checks if the base number is divisible by each additional number.
     * @returns {Object} An object where keys are additional numbers and values are boolean indicating divisibility.
     */
    isDivisibleBy: () => {
      const divisibleBy = {};
      numbers.forEach((num) => {
        divisibleBy[num] = number % num === 0;
      });
      return divisibleBy;
    },
  
    /**
     * Multiplies the base number by all additional numbers.
     * @returns {number} The result of multiplying all numbers.
     */
    multiply: () => {
      if (numbers.length === 0) return number;
      return numbers.reduce((acc, curr) => acc * curr, number);
    },
  
    /**
     * Divides the base number by all additional numbers.
     * @throws {Error} If any of the additional numbers is zero.
     * @returns {number} The result of dividing all numbers.
     */
    divide: () => {
      if (numbers.length === 0) return number;
      if (numbers.includes(0)) throw new Error("Division by zero is not allowed");
      return numbers.reduce((acc, curr) => acc / curr, number);
    },
  });
module.exports = MathOperations;
