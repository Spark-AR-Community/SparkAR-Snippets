/*
Prerequisites
* Make sure you added Script Dynamic Instancing on your capability
* Make sure you seleted Tap under TouchGestures on your capability
*/

//Create plane Dynamically in code On Tap

// load in modules
const Scene = require('Scene');
const tap = require("TouchGestures");

(async function () {

    // Accessing the Focal Distance
    const [fd] = await Promise.all([

        Scene.root.findFirst("Focal Distance"),

    ]);

    // Array to store the created elements 
    var totalPlane = [];
    var x = 0;

    // Tap function 
    tap.onTap().subscribe(async () => {

        //Promise that creates plane on tap
        let [planeClone] = await Promise.all([

            Scene.create("Plane", {
                "name": "Plane",
                "width": 0.1,
                "height": 0.1,
                "x": x,
                "y": 0,
                "z": 0,
                "hidden": false,
            }),
        ]);
        //Storing the created plane
        totalPlane.push(planeClone);
        //Adding the created plane to the parent and the scene
        fd.addChild(totalPlane[totalPlane.length - 1]);
        x += .1;
    });



})();
