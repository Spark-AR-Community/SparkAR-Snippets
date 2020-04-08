//
// In this snippet we are showing how to make a countdown
// to an event. The countdown will end at the same time
// for all users in dsifferent timezones worldwide.
//
// Note: If the user have manually set the time on their 
// device to the future or past this script will behave 
// differently on their device. 
// 
//
// Original script was created by Lasse Mejlvang Tvedt
//

// Project requirements:
// a fromScript boolean value called pastDate
// a fromScript scalar value called daysUntilEvent

//
// Spark AR Modules
//
const Patches = require('Patches');
const Time = require('Time');

//
// Local Dependencies
//
import { createGlobalDate, convertMStoDays } from './util';

// Use createGlobalDate helper functiomn to create 
// a UTC date in local timezone
// Aruguments:
// year (required)
// month (required)
// day (optional)
// hours (optional) 
// minutes = (optional)
// seconds = (optional)
// ms = (optional)
// The time should be in UTC. UTC is almost the same as GMT.
// UTC was a new universal standard created to adapt to earths 
// varying rotation (Leap seconds). The difference between UTC 
// and GMT is minimal. So Paris is GMT+1 then subtract 1 hour to 
// the time when setting the time
const theGrandFinale = createGlobalDate(
  2020, // year
  2,  // month
  27, // day
  17  // hour NOTE: if the eveny is at 18:00 in Paris (GMT+1), then it's 18 - 1; 
);

// Get current time from then the filter experience was started.
const timeNow = new Date();

// Use elapsed time since filter started to detect if 
// we are closer to the final event.
const subscriptionTime = Time.ms.monitor({fireOnInitialValue: false}).subscribe(evt => {
  // Calculate miliseconds left until event.
  // event time in ms - (time when filter experience was started + elpsed time since filter experience started)
  // = Miliseconds until event is supposed to happen.
  const timeLeftUntilEvent = theGrandFinale.getTime() - (timeNow.getTime() + evt.newValue);

  // If is or less than zero, then we're past the deadline
  if (timeLeftUntilEvent <= 0) {
    // Tell that we are past event date.
    Patches.inputs.setBoolean('pastDate', true);
    // Unsubscribe the time listener since we don't 
    // need to check for this anymore
    subscriptionTime.unsubscribe();
  } else {
    // There are still some time left until the event
    // Convert time left into whole days, and update value in patches
    Patches.inputs.setScalar('daysUntilEvent', Math.round(convertMStoDays(timeLeftUntilEvent)));
  }
});
