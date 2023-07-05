// Script to 'tap to change' an object's material
// Add in your scene objects and materials that will be assigned to that object
// Make sure to enable the Touch Gestures > Tap under your project's capabilities
// Then load in this script and change the names in this script to match your objects and materials

// Rewritten for Spark AR v86+ by Balraj Bains 2021, updated by Tomas Pietravallo 2023
// Original author for pre v86 Bridget Walsh Clair :)

// Load modules
const Scene = require('Scene');
const Materials = require('Materials');
const TouchGestures = require('TouchGestures');

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function() {

    // Access materials -- or throw an error explaining what happened if they cannot be found
    const mats = await Promise.all([ 
        Materials.findFirst('green'),
        Materials.findFirst('red'),
        Materials.findFirst('blue')
    ]).catch(() => { throw new Error(`Materials named red, green, and blue were not found on your project, please create them or update the script to match existing materials`) });

    // Access scene objects
    const objectToChange = await Scene.root.findFirst('faceMesh0');

    // Check if the object could be found
    if (objectToChange == undefined) {
      throw new Error(`An object called faceMesh0 could not be found on your project, please create it or update the script to match existing objects`)
    }

    // Assign the value of the current index in the mats array to the specified scene object
    let matIndex = 0;
    objectToChange.material = mats[matIndex];
    TouchGestures.onTap().subscribe(toggleMat);

    function toggleMat() {
        matIndex++;
        // loop back to zero if the index is larger than the amount of materials
        if (matIndex >= mats.length) {
            matIndex = 0;
        }
        objectToChange.material = mats[matIndex];
    };
    
})();
