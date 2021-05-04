// Script to 'tap to change' an object's material
// To set up in Spark AR, enable 'Instructions' under project capabilties
// Add in your scene objects and materials that will be assigned to that object
// Then load in this script and change the names in this script to match your objects and materials


// Rewritten for Spark AR v86+ by Balraj Bains 2021
// Original author for pre v86 Bridget Walsh Clair :)



// Load modules
const Scene = require('Scene');
const Materials = require('Materials');
const TouchGestures = require('TouchGestures');
const Instruction = require('Instruction');


// Main async function pt1
(async function() {
    // Set the instruction to show 'Tap to change'
    Instruction.bind(true, 'tap_to_change');

    // Access materials
    const mats = await Promise.all([ 
        Materials.findFirst('green'),
        Materials.findFirst('red'),
        Materials.findFirst('blue')
    ]);

    // Access scene objects
    const objectToChange = await Scene.root.findFirst('faceMesh0');


    // Assign the value of the current index in the mats array to the specified scene object
    let matIndex = 0;
    objectToChange.material = mats[matIndex];
    TouchGestures.onTap().subscribe(toggleMat);

    function toggleMat() {
        matIndex++;
        if (matIndex >= mats.length) {
            matIndex = 0;
        }
        objectToChange.material = mats[matIndex];
    };
    
// Enables async/await pt2
})();
