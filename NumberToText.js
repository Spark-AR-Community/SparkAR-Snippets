
// SparkAr module
const Scene = require("Scene");
const Patches = require("Patches");

(async function () {
  //importing the text elements
  let txtScore = await Scene.root.findFirst("2dText0");

  //geting the score toScript value text 
  txtScore.text = Patches.outputs.getScalar("score").then(patchScore => {
    patchScore.monitor().subscribe(evt => {
      //return the score as a string
      return evt.newValue.toString();
    });
  });
})();
