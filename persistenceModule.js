/*
This is an example of how to use the persistence module.
For this example we'll store the value of a slider (a real use case) but you can store pretty much anything.

Project setup:
- Persistence:
  Whitelist your key (in this example 'savedSliderValue')
  Go to Project > Edit Properties... > Capabilities > + Persistence > Write you key in the text box.

- NativeUI:
  Enable the Slider
*/

// Load the required modules
const NativeUI = require('NativeUI');
const Persistence = require('Persistence');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

// Shortcut for 'NativeUI.slider'
const slider = NativeUI.slider;
let sliderValue = 0.5; // Slider values range from 0 to 1. This value will be the default if no value was stored previously

Persistence.userScope.get('savedSliderValue').then((savedSliderValue) => {
    /*
    This conditional won't execute if the savedSliderValue is undefined/null.
    Thus if no object was stored the code inside won't get executed and sliderValue will preserve it's current value
    If you are confused as to how if(savedSliderValue){} works see https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    */
    if (savedSliderValue) {
      Diagnostics.log('if check');
      // The line below gets the 'value' attribute of the object, see lines 46 & 47
      sliderValue = savedSliderValue.value;
    }
  })
  .then(() => {
    // Configure the slider, the slider must be configured after getting the value
    slider.value = sliderValue;
    slider.visible = true;
  });

slider.value
  .monitor({ fireOnInitialValue: true }) // monitor changes in the value
  .select('newValue') // you can either get the 'newValue' or 'oldValue'
  .subscribe((newSliderValue) => { // The function in .subscribe() gets executed everytime the value changes
    // You have to store things as objects. So we create an object with a property called 'value'
    Persistence.userScope.set('savedSliderValue', { value: newSliderValue });
    sliderValue = newSliderValue;

    /*
    Optional: send the value to the patch editor.
    Select a script and create a From Script variable called 'slider'
    The 'Patches' module is already imported on line 17
    */
    // Patches.inputs.setScalar('slider', sliderValue);
  });
