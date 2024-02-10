const TrainValidate = require("./models/Train");

const trainingData = [
  { x: 1, y: 20 },
  { x: 2, y: 40 },
  { x: 3, y: 60 },
  { x: 4, y: 80 },
];
const inputData = {
  feature1: 4,
  feature2: 40,
};
const a = new TrainValidate(inputData, trainingData);
console.log('a =>',a);