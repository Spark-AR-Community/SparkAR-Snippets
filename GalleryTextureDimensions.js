//==============================================================================
// The following example demonstrates how to get the width and height of the
// Gallery Texture and pass them to Patch Editor
//
// Project setup:
// - Add a gallery texture asset (Assets > Add asset > Gallery Texture) and
//   keep its default name. You can change it later.
// - Inspect the script asset and add two From Script variables:
//   GalleryTextureWidth and GalleryTextureHeight
// - Click the 'Create Producer Patch' button which is below the variables
//==============================================================================

const Patches = require('Patches');
const Textures = require('Textures');

(async function() {
  const galleryTexture = await Textures.findFirst('galleryTexture0');
  await Patches.inputs.setScalar('GalleryTextureWidth', galleryTexture.width);
  await Patches.inputs.setScalar('GalleryTextureHeight', galleryTexture.height);
})();
