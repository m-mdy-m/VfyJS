const TrainModel = require("./model");
class MlVfy {
  constructor(rule, trainingData) {
    this.result = {};
    this.rule = rule;

    const trainModel = new TrainModel(trainingData);

    for (const key in rule) {
      if (rule.hasOwnProperty(key)) {
        const inputValue = rule[key];
        const predictedValue =
          trainModel.model.slope * inputValue + trainModel.model.intercept;

        if (predictedValue >= 0 && predictedValue <= 100) {
          this.result[key] = true; // Valid
        } else {
          this.result[key] = false; // Invalid
        }
      }
    }
  }
}
// Example usage:
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

const result = new MlVfy(inputData, trainingData);
console.log("result =>", result);
