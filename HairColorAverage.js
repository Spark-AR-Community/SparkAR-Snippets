// Load in the required modules
const Materials = require('Materials');
const Segmentation = require('Segmentation');
const Reactive = require('Reactive');
const Shaders = require('Shaders');

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function () {
    // Find a Material called "defaultMaterial0" or throw an error explaining what happened if it cannot be found
    const [mat] = await Promise.all([
        Materials.findFirst('defaultMaterial0')
    ]).catch(() => {
		throw new Error(`There is no material called defaultMaterial0 on your project, please create one, or modify the script to match an existing material`)
	});

    // Getting averge color of the hair 
    const color = Reactive.pack4(
        Segmentation.hair.averageColor.red, 
        Segmentation.hair.averageColor.green, 
        Segmentation.hair.averageColor.blue, 
        Segmentation.hair.averageColor.alpha
    );

    // Getting the texture Slot
    const textureslot = Shaders.DefaultMaterialTextures.DIFFUSE;

    // Setting the color in the Texture slot
    mat.setTextureSlot(textureslot, color);
})();
