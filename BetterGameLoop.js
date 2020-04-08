//
// In this script we show a better way to
// do callbacks on frame since intervals can be unsteady.
// This can be used in game loops and for running aniations
// without the animation module. It is very similar to the
// requestAnimationFrame approuch in web.
//
// Original post was created by Lasse Mejlvang Tvedt
// URL: https://www.facebook.com/groups/SparkARcommunity/permalink/807800406298670/
//

//
// Spark AR Modules
//
const Time = require('Time');

// Store current frame.
let frame = 0;

// Subnscribe to runtime since this is updated
// on every frame at current frame rate, and takes
// framedrops into the calculations
Time.ms.monitor().subscribe(evt => {
  // Count frames
  frame++;
  // Store time since loop startet
  const now = evt.newValue;
  // Calculate time between current and previous frame
  // Delta is the number of miliseconds passed since last frame.
  // This can be used for moving objects in a consistent speed even
  // with frame drops.
  const delta = now - evt.oldValue;

  //
  // Do your magic
  //
});
