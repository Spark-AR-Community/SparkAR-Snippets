// This is the scrip eqauliant of chaing multiple Step Gradient patches together.
// If you are looking a easy way to do this in patches, you can use Mate Steinforth's 
// Easy Gradient Patch: https://gumroad.com/l/yYREv

// Import dependencies
const R = require('Reactive');
const S = require('Shaders');

// Helper function for creating gradients.
export function gradientStep(gradient, steps = []) {
	if (steps.length < 2) {
		throw 'You need at least 2 colors to make an gradient.';
	}

	let previousStep = steps[0][0];

	for(let i = 1; i < steps.length; i++) {
		previousStep = R.mix(previousStep, steps[i][0], R.smoothStep(gradient, steps[i-1][1], steps[i][1]));
	}

	return previousStep;
}

//
// Usage
// 
// Create gradient type you want.
// HORIZONTAL: The gradient will be in horizontal direction.
// CIRCULAR: The gradient will radiate outward in a circular direction.
// VERTICAL: The gradient will be in vertical direction.
// https://sparkar.facebook.com/ar-studio/learn/documentation/reference/enums/shadersmodule.gradienttype
const gradientType = S.gradient({type: 'HORIZONTAL'});

const gradient = gradientStep(gradientType, [
  // Array, first value is the color, second is the location of the color 
  // on the gradient (The same way as photoshop).
	[R.pack4(1, 0, 0, 1), 0],
	[R.pack4(0, 1, 0, 1), .5],
	[R.pack4(0, 0, 1, 1), 1],
  // Here you can add as many colors as you want
  // Just remember to have the locations in right order.
]);
