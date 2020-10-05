// Load in the required modules
const Materials = require('Materials');
const Segmentation = require('Segmentation');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
// Enable async/await in JS [part 1]
(async function () {

    //Find Material 
    const [mat] = await Promise.all([
        Materials.findFirst('defaultMaterial0')
    ]);

    let color;
    // Getting averge color of the hair 
    color = Reactive.pack4(Segmentation.hair.averageColor.red, Segmentation.hair.averageColor.green, Segmentation.hair.averageColor.blue, Segmentation.hair.averageColor.alpha)

    // Getting the texture Slot
    const textureslot = Shaders.DefaultMaterialTextures.DIFFUSE;

    // Setting the color in the Texture slot
    mat.setTextureSlot(textureslot, color);



})();
