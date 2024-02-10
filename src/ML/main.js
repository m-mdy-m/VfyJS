const TrainValidate = require("./models/Train");

const trainingData = [
  { x: 1, y: 20 },
  { x: 2, y: 40 },
  { x: 3, y: 60 },
  { x: 4, y: 80 },
];

// Example input data to be validated
const inputData = {
  name: "John Doe",
  age: 25,
  email: "john@example.com",
};
const a = new TrainValidate(inputData, trainingData);
console.log("a =>", a);
