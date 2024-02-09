const TrainModel = require('./model')
class validate{
    constructor(rule,model) {
        new TrainModel(rule)
        this.rule = rule
        this.obj = rule.forEach(obj =>{
            this.obj = obj
        })
        // this.value = 
    }
}

const input = [
    {x:1,y:20},
    {x:2,y:40},
    {x:3,y:60},
    {x:4,y:80},
]
const a = new validate(input,'test')
// console.log('a =>',a);