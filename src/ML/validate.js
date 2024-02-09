const TrainModel = require("./model");
class validate {
  constructor(rule, modelMl) {
    this.resultTrain = new TrainModel(rule);
    this.model = this.resultTrain.model;
    this.rule = rule;
    this.obj = rule.forEach((obj) => {
      this.obj = obj;
    });
    // console.log(this.obj);

    this.value = this.model.slope * this.obj + this.model.intercept;
    // console.log(this.value);
  }
}

const input = [
  { x: 1, y: 20 },
  { x: 2, y: 40 },
  { x: 3, y: 60 },
  { x: 4, y: 80 },
];
for (const key in input) {
  if (Object.hasOwnProperty.call(input, key)) {
    const element = input[key];
    console.log(element);
  }
}
const a = new validate(input, "test");
// console.log('a =>',a);
