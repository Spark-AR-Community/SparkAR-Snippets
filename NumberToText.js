// SparkAr module
const Scene = require("Scene");
const Patches = require("Patches");

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
(async function () {
	// importing the text elements, and explain what happened if the code were to fail
	let textObject = await Scene.root.findFirst("2dText0").catch(() => { throw new Error(`no object called 2dText0 found on your Scene, please create one or modify the script for it to work`) });

	// getting the score toScript value text
	Patches.outputs.getScalar("score").then((patchScore) => {
		// Monitor the value of the scalar signal
		patchScore.monitor({fireOnInitialValue: true}).subscribe((evt) => {
			// set the text property of our scene object to the new value (converted into a string)
			textObject.text = evt.newValue.toString();
		});
	}).catch(() => {
    // throw an error explaining what happened if the code were to fail to load the Patch bridge variable
    throw new Error(`A Patch bridge variable of Type Scalar and name "score" was not found.\nTo create Patch Bridge variables, select any Javascript or Typescript files and head to the inspector panel.\nLearn more about Patch Bridge variables here: https://sparkar.facebook.com/ar-studio/learn/patch-editor/bridging`)
  }) ;
})();
