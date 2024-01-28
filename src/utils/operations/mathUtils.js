// Define the MathOperations object
const MathOperations = (number, ...numbers) => ({
  // Check if the base number is even
  isEven: () => number % 2 === 0,

  // Check if all numbers (including the base number) are even
  isEvenAll: () => [number, ...numbers].every((num) => num % 2 === 0),

  // Check if the base number is odd
  isOdd: () => number % 2 !== 0,

  // Check if all numbers (including the base number) are odd
  isOddAll: () => [number, ...numbers].every((num) => num % 2 !== 0),

  // Add all additional numbers to the base number
  add: () => numbers.reduce((acc, curr) => acc + curr, number),

  // Subtract all additional numbers from the base number
  subtract: () => numbers.reduce((acc, curr) => acc - curr, number),

  // Check if the base number is divisible by each additional number
  isDivisibleBy: () => {
    const divisibleBy = {};
    numbers.forEach((num) => {
      divisibleBy[num] = number % num === 0;
    });
    return divisibleBy;
  },

  // Multiply the base number by all additional numbers
  multiply: () => {
    if (numbers.length === 0) return number;
    return numbers.reduce((acc, curr) => acc * curr, number);
  },

  // Divide the base number by all additional numbers
  divide: () => {
    if (numbers.length === 0) return number;
    if (numbers.includes(0)) throw new Error("Division by zero is not allowed");
    return numbers.reduce((acc, curr) => acc / curr, number);
  },
});
ئخ