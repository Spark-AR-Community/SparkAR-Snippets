// code by RBKavin

//this code allow us to get the 3d position of any object and send it to patch editor

//Importing modules
const s = require("Scene");
const p = require("Patches");


Promise.all([
    // it gets the first element thats named object
    s.root.findFirst("object")
]).then(result => {

    // result[0] contain the object 
    let obj = result[0];

    // need to create a from script vec 3 called objPos 
    // objects position will be sent to the objPos 
    p.inputs.setVector("objPos", obj.transform.position);

    //objects World Position will be sent to the vex 3 fromScript called objWorldPos
    p.inputs.setVector("objWorldPos", obj.worldTransform.position);


});