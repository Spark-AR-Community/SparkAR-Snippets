
// SparkAr module
const s = require("Scene");
const p = require("Patches");

(async function () {

//importing the text elements
let Text = await s.root.findFirst("2dText0");

//geting the score toScript value text 
Text.text = p.outputs.getScalar("score").then(obj => {

obj.monitor().subscribe(o => {

//return the score as a string
return o.newValue.toString();

});
});
})();
