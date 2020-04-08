//
// In this example we are trying to get a texture based on language
// set on the users device. It will look for textures named in the 
// same naming convention as Spark AR's Locale.locale: "Provides the 
// ISO 639-1 language + ISO 3166-1 region compliant locale identifier, 
// e.g. en_US or zh_HK."
// Source: https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/localemodule
//
// It will try getting the texture named ISO 639-1 language + ISO 3166-1 (eg. 'en_US') first, and then
// the texture named in similar to ISO 639-1 (eg. 'en') language, and at last a fallback
// name that the user provide ('en' by default) if no relevant to the locale is found.
//
// Script was created by Lasse Mejlvang Tvedt while helping a friend.
//

//
// Spark AR Modules
//
const D = require('Diagnostics');
const Locale = require('Locale');
const Tex = require('Textures');

//
// Function for loading a texture based on language
// on the users device,
//
function getTextureBasedOnLanguage(fallback = 'en') {
	// Use a promise since we need to wait to check if anything is loaded
	return new Promise((resolve, reject) => {
		// Locale.locale is a StringSignal so we will have to wait until 
		// the singal is set.
		const subscriberLocale = Locale.locale.monitor({ fireOnInitialValue: true}).subscribe(evt => {
			// Only trigger this event once.
			subscriberLocale.unsubscribe();

			// Cache locale and fallback to "foo_bar" in case
			// locale is set. Tex.findFirst probably needs 
			// a value and not a empty string.
			// Also, Spark AR Studio will always return 'foo_bar'
			const isoLocale = evt.newValue || 'foo_bar';			

			// Try loading all the textures
			Promise.all([
				// Try loading the texture for the full language 
				// & region code (ISO 639-1 + ISO 3166-1). 
				Tex.findFirst(isoLocale),
				// Also try load the texture for language (ISO 639-1) 
				// without region.
				Tex.findFirst(isoLocale.split('_')[0]),
				// Try loading fallback texture as well.
				Tex.findFirst(fallback),
			]).then(textures => {
				// Get the first texture that is successfully loaded.
				// If didnt find any this will return null.
				const texture = textures.find(texture => texture);

				// If any texture was succesfully loaded
				if (texture) {
					// Return that texture
					resolve(texture)
					return;
				}

				// Tell that no textures was found if didnt 
				// find any relevant textures.
				reject('No texture found.');
			});
		});
	});
}

// Get texture based on user locale, with texture named
// 'fallbackName' as fallback.
getTextureBasedOnLanguage('fallbackName').then(texture => {
	// If a texture was found and loaded
	D.log(texture);
}).catch(err => {
	// If no txture was found.
	D.log(err);
});
