// In this snippet we are going to calculate 
// the number of days left until an upcoming month/day 
// and output the number into a string for a text object.

// Originally sourced from https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-9.php
// Revised by: Beth Wickerson

// ============================================================
// Project requirements:
// Create a 2D or 3D Text Object and name it "daysLeftText".

// Import Spark AR Modules
const S = require('Scene');
const T = require('Time');
const D = require('Diagnostics');


(async function () {
  // Find our text object
  const [textObject] = await Promise.all([
    S.root.findFirst('daysLeftText')
  ]);

  // Create a function to calculate the number of days left
  function calculateDays(){
    //
    // Declaring a Javascript Date:
    // In JavaScript Date objects are based on a time value 
    // that is the number of milliseconds since 1 January, 1970 UTC.
    // While the time value at the heart of a Date object is UTC, the 
    // basic methods to fetch the date and time or its components all 
    // work in the local (i.e. host system) time zone and offset.
    
    // Get today's date according to local time
    const today = new Date();
    //
    // Declare a couple of variables to hold the month and day of our event.
    // -- JavaScript counts months as a zero-based value between 0 and 11 
    // -- January is 0, February is 1, and so on
    // -- Days are counted is an integer between 1 and 31 
    const eventMonth = 11;
    const eventDay = 25;
    // Create a new Date object for our event with the year from today's date 
    // new Date(year, month, day)
    var eventDate = new Date(today.getFullYear(), eventMonth, eventDay);
    // Create a conditional to detect if today is the date of the event, 
    // If the date matches, add 1 to the year.
    if (today.getMonth()==eventMonth && today.getDate()>eventDay) {
      eventDate.setFullYear(eventDate.getFullYear()+1); 
    }
    // Declare a variable to hold the number of milleseconds in one day.
    const one_day = 1000*60*60*24;
    // 
    // Calculate the difference between our event date and today's date 
    // and divide by the number of milliseconds in a day.
    // We may end up with a difference of one hour if your event crossed
    // a daylight savings time boundary, but for simplicity we are focusing
    // only on the number of days.
    // -- This will result in our number of days left!
    const days = Math.ceil((eventDate.getTime()-today.getTime())/(one_day));
    // If your event has passed, you will get a negative number
    //
    // Let's create a string to add some text around our number
    const daysLeft = "Only " + days + " days left until Christmas!";
    // and check our output in the Console
    D.log(daysLeft);
    
    // If you only want to return the number, bypass the daysLeft variable and change line 70 to:
    // textObject.text = days;
    textObject.text = daysLeft;
  }
  // Envoke our function
  calculateDays();

})();