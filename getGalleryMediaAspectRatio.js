/**
 * Written by KrazyyKrunal 
 * https://www.facebook.com/sparkarhub/portfolios/ig/krazyykrunal/
 */
const Scene = require('Scene');
export const Diagnostics = require('Diagnostics');
const Textures = require('Textures');
const Patches = require('Patches');
const Reactive = require('Reactive');
(async function () {  

  //Get the galleryTexture
const galleryTex = await Textures.findFirst('galleryTexture0');

//Calculate Aspect ratio
var aspectRatio = galleryTex.width.div(galleryTex.height)

//Send the value to patch editor
Patches.inputs.setScalar('aspectRatio',aspectRatio)

//This will ensure whenever the media is changed it will send the updated value to the patch editor
//also it will fire a pulse whenever the media is changed
galleryTex.onMediaChange.subscribe(function(){
  Diagnostics.log('Event Fired')
  Patches.inputs.setScalar('aspectRatio',aspectRatio)
  Patches.inputs.setPulse('mediaChanged',Reactive.once())
})
})(); 
