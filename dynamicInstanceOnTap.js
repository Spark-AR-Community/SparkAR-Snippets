/*
Prerequisites
* Make sure you added Script Dynamic Instancing on your capability
* Make sure you seleced Tap under TouchGestures on your capability
*
* If you fail to add these to your project's Capabilities you will get error messages
*/

// Create plane Dynamically in code On Tap

// load in modules
const Scene = require('Scene');
const TouchGestures = require("TouchGestures");
const Reactive = require("Reactive");

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function () {

    // Accessing the Focal Distance scene object
    const [fd] = await Promise.all([

        Scene.root.findFirst("Focal Distance"),

    ]);

    // Array to store the created elements 
    var totalPlane = [];
    var x = 0;

    // Tap function 
    TouchGestures.onTap().subscribe(async () => {

        // Promise that creates plane on tap
        let [newPlane] = await Promise.all([

            Scene.create("Plane", {
                "name": "Plane",
                "width": 0.1,
                "height": 0.1,
                "transform": Reactive.transform(
                  // The transform's position, scale, and rotation values:
                  Reactive.point(x,0,0),
                  Reactive.scale(1,1,1),
                  Reactive.quaternionFromEuler(0,0,0)
                ),
                "hidden": false,
            }),
        ]);
        //Storing the created plane
        totalPlane.push(newPlane);
        //Adding the created plane to the parent and the scene
        fd.addChild(totalPlane[totalPlane.length - 1]);
        x += .1;
    });

    // Note: Because on each tap we increment x by 0.1, and use that x variable to create our dynamic plane
    // If you tap multiple times then the planes will get instanced next to each other, instead of the same spot

})();
