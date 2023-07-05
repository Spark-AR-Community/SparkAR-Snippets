//
// In this snippet we are playing with promises
// to delay pulses sent to patches, and sequencing pulses etc.
//
// Original script was created by Lasse Mejlvang Tvedt
//

// Project requirements:
// a fromScript pulse value called trigger

//
// Spark AR Modules
//
const R = require('Reactive');
const D = require('Diagnostics');
const Patches = require('Patches');
const Time = require('Time');

//
// Async delay function
// This will return a promise that is 
// resolved after x miliseconds
//
const delay = (ms) => new Promise(resolve => Time.setTimeout(() => resolve(), ms));

//
// Function for sending pulse
// This is just a wrapper for sending a pulse 
// through the trigger input.
// it returns as a promise so it can be chanied
// and trigger something after the pulse was 
// properly sent.
//
const sendPulse = () => {
  D.log('Pulse');
  return Patches.inputs.setPulse('trigger', R.once()).catch(() => {
    // If the function fails to send the patch variable, explain what happened and how to fix the issue
    throw new Error(`You need to add a Patch bridge variable of type "Pulse" called "trigger" to the Patch editor, learn more about those here: https://sparkar.facebook.com/ar-studio/learn/patch-editor/bridging/#sending-variables-from-the-patch-editor-to-scripts .\n\nNote: even after creating the variable, it is important you drag the script file to the patch editor for it to be accessible and the code to work`)
  });
}

//
// Another example on how you can chain 
// promises to send pulses on intervals.
//
function sendThreePulsesWithInterval(interval) {
  // Start of by triggering one pulse
  // We are returiing it as a promise so we can
  // detect when all pulses have been sent.
  return sendPulse()
  // Wait X MS (interval value)
  .then(() => delay(interval))
  // Send second pulse
  .then(sendPulse)
  // Wait again
  .then(() => delay(interval))
  // Send last pulse
  .then(sendPulse);
}


// Wait 5000 miliseconds (5 Seconds) and
// then send a pulse, and then log
// that a pulse was sent.
D.log('Wait 5 seconds before pulse');
delay(5000).then(sendPulse).then(() => {
  D.log('A pulse was sent after 5 seconds.');

  // Trigger the sendThreePulsesWithInterval function
  // with 2000 MS between each pulse
  D.log('Send 3 pulses');
  sendThreePulsesWithInterval(2000).then(() => {
    // Log when all 3 pulses have been sent.
    D.log('3 pulses was sent');
  });
});
