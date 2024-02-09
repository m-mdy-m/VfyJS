const model = require('')
class validate{
    constructor(rule,model) {
        this.rule = rule
        this.obj = rule.forEach(obj =>{
            this.obj = obj
        })
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
