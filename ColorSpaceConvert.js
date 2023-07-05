const Time = require('Time');
const Material = require('Materials');
const Reactive = require('Reactive');
const Shaders = require('Shaders');

//This define the input colorspace and output colorspace you wish to covert
const colorspaceconfig = {
    inColorSpace: 'HSV',
    outColorSpace: 'RGB'
};

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function(){
    const material = await Material.findFirst('material0');

    let hue = 0;
    let color;

    // Create an interval that will run the code inside every 500ms
    Time.setInterval(()=>{
        // Set a random hue value from 0-1 for every 500ms
        // Get a random number from the Math object/module
        hue = Math.random()
        // Convert into a Vector3 and then from HSV to RGB
        // Use the color configuration we created earlier when defining "colorspaceconfig"
        color = Shaders.colorSpaceConvert(Reactive.pack3(hue, 1, 1), colorspaceconfig);
        // Pack to vec4 with alpha 1
        color = Reactive.pack4(color.x, color.y, color.z, 1)

        // Set textureslot and assign to material
        const textureslot = Shaders.DefaultMaterialTextures.DIFFUSE;
        material.setTextureSlot(textureslot, color);

    // Set the interval duration to 500ms 👇
    }, 500);
})();
