//import statements
const Patches = require('Patches')
const Reactive = require('Reactive');

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function() {
    //Get Number Value
    var score = Patches.outputs.getScalar('NumValue')
    var str = ''

    //Format String such as if less then 10, number will be in '01','02' etc format  
    str = score.ge(10).ifThenElse(score.toString(),Reactive.concat('0',score.toString()))

    //Set variable output string value
    Patches.inputs.setString('TextValue',str)
})();
