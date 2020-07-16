// code by kavin kumar

//this is a example of accessing child object using the parent
//this will help you when u have children having same name with multiple parents 

//  load in modules
const s = require('Scene');
const d = require('Diagnostics');

//promise start 

Promise.all([

//it goes to the object1 first and then it looks for object1 child named object2

    s.root.findByPath("**/object1/object2")

]).then((result) => {
    d.log(result[0][0].name)
});
