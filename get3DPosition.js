// code by RBKavin

//this code allow us to get the 3d position of any object and send it to patch editor

//Importing modules
const Scene = require("Scene");
const Patches = require("Patches");


Promise.all([
    // it gets the first element thats named object
    Scene.root.findFirst("object")
]).then(result => {
    // result[0] contain the object 
    const obj = result[0];

    // need to create a from script vec 3 called objPos 
    // objects position will be sent to the objPos 
    Patches.inputs.setVector("objPos", obj.transform.position);

    //objects World Position will be sent to the vex 3 fromScript called objWorldPos
    Patches.inputs.setVector("objWorldPos", obj.worldTransform.position);
});
