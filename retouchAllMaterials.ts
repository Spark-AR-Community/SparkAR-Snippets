// Made by Tomás Pietravallo for the Spark AR Community

// IMPORTANT 👇
// This file is TYPESCRIPT, *NOT JAVASCRIPT*.
// You need to create/use Typescript (.ts) files in Spark AR Studio for it to work


// Import the modules needed
import Materials from 'Materials';
import NativeUI from 'NativeUI';

// Check whether the Slider capability is turned on
// This needs to be done because Spark doesn't turn it on automatically
if(NativeUI.slider == null){
throw `The Slider capability isn't turned on.
Please go to Project > Capablities > NativeUI > ✅ Slider.
You are doing great, keep going ✨`
};

// Using async allows us to use await, for more info on async/await you can visit: https://github.com/tomaspietravallo/sparkar-fdccc2020#asyncawait
(async function () {

    // Use Typescript types to get Intelisense in VSCode
    // Materials.getAll returns an array (inside a Promise) with all the materials in the project
    // `await` is used to wait for the getAll() promise
    const materials: MaterialBase[] = await Materials.getAll();

    // Make the slider visible
    NativeUI.slider.visible = true;

    // Make the default slider value 1.0
    // This is the max value, and will be the default in case the user doesn't change it
    NativeUI.slider.value = 1.0;

    // Loop over the Materials.getAll array
    // This means the code will apply for *all* materials in your project
    for (let index = 0; index < materials.length; index++) {
        // Use Array[index] to get a particular material from the array
        // `m` is the material we check on the particular loop iteration
        const m = materials[index];

        // If this particular material isn't 'Retouch' (doesn't have the skinSmoothingFactor property), skip it
        if (m.skinSmoothingFactor == null) return;

        // Set the smoothing factor to the slider value
        // skinSmoothingFactor values range from 0-1, just like the slider values
        m.skinSmoothingFactor = NativeUI.slider.value;
    };

})();


/**
 * Note:
 * The (function(){ ... })(); syntax is called an 'IIFE' (Immediately Invoked Function Expression)
 * It is one of many ways to use functions, you can learn more about it here:
 * https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 */