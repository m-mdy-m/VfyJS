// Define the MathOperations object
const MathOperations = (number, ...numbers) => ({
    // Check if the base number is even
    isEven: () => number % 2 === 0,
  
    // Check if all numbers (including the base number) are even
    isEvenAll: () => [number, ...numbers].every(num => num % 2 === 0),
  
    // Check if the base number is odd
    isOdd: () => number % 2 !== 0,
  
    // Check if all numbers (including the base number) are odd
    isOddAll: () => [number, ...numbers].every(num => num % 2 !== 0),
  
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
  
  // Example usage of MathOperations
  
  // Base number
  const baseNumber = 10;
  
  // Additional numbers
  const additionalNumbers = [2, 3, 5];
  
  // Create a MathOperations object
  const math = MathOperations(baseNumber, ...additionalNumbers);
  
  // Check if the base number is even
  console.log("Is the base number even?", math.isEven()); // Output: true
  
  // Check if all numbers (including the base number) are even
  console.log("Are all numbers even?", math.isEvenAll()); // Output: false
  
  // Check if the base number is odd
  console.log("Is the base number odd?", math.isOdd()); // Output: false
  
  // Check if all numbers (including the base number) are odd
  console.log("Are all numbers odd?", math.isOddAll()); // Output: false
  
  // Check if the base number is divisible by each additional number
  const divisibility = math.isDivisibleBy();
  console.log("Divisibility:", divisibility); // Output: { '2': true, '3': false, '5': true }
  
  // Multiply the base number by all additional numbers
  console.log("Multiplication result:", math.multiply()); // Output: 300 (10 * 2 * 3 * 5)
  
  // Divide the base number by all additional numbers
  console.log("Division result:", math.divide()); // Output: 0.6666666666666666 (10 / 2 / 3 / 5)
  
  // Add all additional numbers to the base number
  console.log("Addition result:", math.add()); // Output: 20 (10 + 2 + 3 + 5)
  
  // Subtract all additional numbers from the base number
  console.log("Subtraction result:", math.subtract()); // Output: -10 (10 - 2 - 3 - 5)
  