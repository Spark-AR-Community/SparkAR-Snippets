//import statements
const Patches = require('Patches')
const Reactive = require('Reactive');

//Get Number Value
var score = Patches.outputs.getScalar('NumValue')
var str = ''

//Format String such as if less then 10, number will be in '01','02' etc format  
str = score.ge(10).ifThenElse(score.toString(),Reactive.concat('0',score.toString()))

//Set variable output string value
Patches.inputs.setString('TextValue',str)
