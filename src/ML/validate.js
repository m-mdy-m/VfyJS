const TrainModel = require("./model");
class validate {
  constructor(rule, modelMl) {
    this.result = {}
    this.rule = rule;
    for (const key in rule) {
        if (Object.hasOwnProperty.call(rule, key)) {
            this.obj = rule[key];
            this.trainModel = new TrainModel(modelMl)
            this.value = this.trainModel.model.slope * this.obj + this.trainModel.model.intercept
            if (this.value >= 0 && this.value <= 100) {
                this.result[key] = true; // Valid
              } else {
                this.result[key] = false; // Invalid
              }
        }
    }
    return this.result
  }
}

const input = [
  { x: 1, y: 20 },
  { x: 2, y: 40 },
  { x: 3, y: 60 },
  { x: 4, y: 80 },
];
const inputData = {
    feature1: 4,
    feature2: 40
  };
const result = new validate(inputData,input)
console.log('result =>',result);
