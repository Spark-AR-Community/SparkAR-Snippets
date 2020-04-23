const LightingEstimation = require('LightingEstimation');
const Reactive = require('Reactive');
const Scene = require('Scene');

//
// Load assets
//
Promise.all([
	Scene.root.findFirst('ambientLight0'),
]).then(onReady);

function onReady(assets) {

const ambientLight0 = assets[0];

// Calculate light intensity by subtracting the frame brightness from 1, the
// darker the frame brightness, the greater the light intensity
const lightIntensity = Reactive.sub(1,LightingEstimation.frameBrightness);

// Bind the light intensity to the intensity of the ambient light
ambientLight0.intensity = lightIntensity;
}