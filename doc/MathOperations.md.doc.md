## Math Operations

#### Usage

To use in your JavaScript project, you can import it as follows:

```javascript
const { mathOperations } = require("vfyjs");
```

#### Functions

1. **isEven**

   - `isEven()` function checks if the base number is even.
   - **Returns:** `boolean` - True if the base number is even, false otherwise.

2. **areAllOdd**

   - `areAllOdd()` function checks if all numbers (including the base number) are odd.
   - **Returns:** `boolean` - True if all numbers are odd, false otherwise.

3. **isOdd**

   - `isOdd()` function checks if the base number is odd.
   - **Returns:** `boolean` - True if the base number is odd, false otherwise.

4. **areAllEven**

   - `areAllEven()` function checks if all numbers (including the base number) are even.
   - **Returns:** `boolean` - True if all numbers are even, false otherwise.

5. **add**

   - `add()` function adds all additional numbers to the base number.
   - **Returns:** `number` - The result of adding all numbers.

6. **subtract**

   - `subtract()` function subtracts all additional numbers from the base number.
   - **Returns:** `number` - The result of subtracting all numbers.

7. **isDivisibleBy**

   - `isDivisibleBy()` function checks if the base number is divisible by each additional number.
   - **Returns:** `Object` - An object where keys are additional numbers, and values are boolean indicating divisibility.

8. **multiply**

   - `multiply()` function multiplies the base number by all additional numbers.
   - **Returns:** `number` - The result of multiplying all numbers.

9. **divide**

   - `divide()` function divides the base number by all additional numbers.
   - **Throws:** `Error` - If any of the additional numbers is zero.
   - **Returns:** `number` - The result of dividing all numbers.

10. **power**

    - `power()` function raises the base number to the power of all additional numbers.
    - **Returns:** `number` - The result of raising the base number to the power of all additional numbers.

11. **generateRandomNumber**

    - `generateRandomNumber(min, max)` function generates a random number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random number between `min` and `max`.

12. **generateRandomEvenNumber**

    - `generateRandomEvenNumber(min, max)` function generates a random even number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random even number between `min` and `max`.

13. **generateRandomOddNumber**
    - `generateRandomOddNumber(min, max)` function generates a random odd number within the specified interval.
    - **Parameters:** `min` - The minimum value of the interval (inclusive), `max` - The maximum value of the interval (inclusive).
    - **Returns:** `number` - A random odd number between `min` and `max`.
14. **isEqual**
    - `isEqual()` function checks if all additional numbers passed are equal to the base number.
    - **Returns:** `boolean ` - True if all additional numbers are equal to the base number, false otherwise.

#### Example

```javascript
const { mathOperations } = require("vfyjs");

const math = MathOperations(2, 3, 4, 5);
console.log(math.isEqual()); // Output: false (since additional numbers 3, 4, 5 are not equal to the base number 2)
console.log(math.isEven()); // Output: true
console.log(math.areAllOdd()); // Output: false
console.log(math.isOdd()); // Output: true
console.log(math.areAllEven()); // Output: false
console.log(math.add()); // Output: 14 (2 + 3 + 4 + 5)
console.log(math.subtract()); // Output: -10 (2 - 3 - 4 - 5)
console.log(math.isDivisibleBy()); // Output: {3: false, 4: true, 5: false} (2 % 3, 2 % 4, 2 % 5)
console.log(math.multiply()); // Output: 120 (2 * 3 * 4 * 5)
console.log(math.divide()); // Output: 0.03333333333333333 (2 / 3 / 4 / 5)
console.log(math.power()); // Output: 32 (2^3^4^5)
console.log(math.generateRandomNumber(1, 100)); // Output: Random number between 1 and 100
console.log(math.generateRandomEvenNumber(1, 100)); // Output: Random even number between 1 and 100
console.log(math.generateRandomOddNumber(1, 100)); // Output: Random odd number between 1 and 100
```
