const T = require('Time');
const M = require('Materials');
const R = require('Reactive');
const Shaders = require('Shaders');

//This define the input colorspace and output colorspace you wish to covert
const colorspaceconfig = {
    inColorSpace: 'HSV',
    outColorSpace: 'RGB'
}

//Find objects
Promise.all([
    M.findFirst('material0')
]).then(loadasset);

//load objects
function loadasset(obj){
    let mat = obj[0];
    let hue = 0;
    let color;

    T.setInterval(()=>{
        //set a random hue value from 0-1 for every 500ms
        hue = Math.random()
        //convert HSV to RGB
        color = Shaders.colorSpaceConvert(R.pack3(hue,1,1),colorspaceconfig);
        //Pack to vec4 with alpha 1
        color = R.pack4(color.x, color.y,color.z,1)

        //set textureslot and assign to material
        const textureslot = Shaders.DefaultMaterialTextures.DIFFUSE;
        mat.setTextureSlot(textureslot, color);

    },500)

    
}



;
