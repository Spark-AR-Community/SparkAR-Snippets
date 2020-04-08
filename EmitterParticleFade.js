//
// In this script we show how to fade out particles from
// a emitter. 
//
// Original post was created by Josh Beckwith
// URL: https://www.facebook.com/groups/SparkARcommunity/permalink/683989935346385/
//

//
// Include modules
//
const Scene = require('Scene');
const Animation = require('Animation');

// Load 'emitter0' object.
Scene.root.findFirst('emitter0').then(emitter => {
  // emitter0 loaded and ready to be used.
  
  // Animate per channel in a HSVA color model.
  // We specify a easing functions for the 
  // rate of change of a channel over time.
  // More info per under channel.
  //
  // Read more about HSV color model here:
  // https://en.wikipedia.org/wiki/HSL_and_HSV
  //
  // Read more about easing functions here:
  // https://easings.net/en
  emitter.hsvaColorModulationModifier = Animation.samplers.HSVA([
  	// H for hue.
  	// Here we tell the Hue channel should have a constant
  	// value of 1 during the lifespan of a particle.
  	// So the Hue vil always stay 1 from start to finish.
    Animation.samplers.constant(1),
    // S for saturation.
    // Here we use contsant again.
    Animation.samplers.constant(1),
    // V for value.
    // And the same here.
    Animation.samplers.constant(1),
    // A for alpha.
    // Here we use a easeInQuad easing function to gradually 
    // change the Alpha channel value for the particle over time.
    // The value will transition from 1 (100% visible) to 0 
    // (0% visible) with a non-linear speed.
    // 
    // Read more about easeInQuad here:
    // https://easings.net/en#easeInQuad
    Animation.samplers.easeInQuad(1, 0)
  ]);

  // The same rules can be applied to other particle properties
  // such as size. Here we are trying out the easeInCirc easing
  // function. All available easing functions in Spark AR
  // can be found here: 
  // https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/animationmodule.samplerfactory/
  emitter.sizeModifier = Animation.samplers.easeInCirc(0, 0.01);

  // Other particle properties that can be modified include 
  // positionModifier and velocityModifier.
  // More information is specified here:
  // https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/scenemodule.particlesystem
});
