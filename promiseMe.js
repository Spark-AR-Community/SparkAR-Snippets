/*

  Module for converting clunky reactive stuff into promises. 
  
  Most likely this will be a collection of random stuff, using a handful of modules. It's probably best to cherry-pick what you need and leave the rest

  This file is a work-in-progress and I'll add snippets as I find a need for them. Contributors are welcome :)

*/

const CameraInfo = require('CameraInfo')

/*
  Normal promise: 
    promiseMe.devicePosition.then(devicePosition => D.log(devicePosition))
    
  With async/await:
    const devicePosition = await promiseMe.devicePosition
*/
module.exports.devicePosition = new Promise((resolve) => {
  CameraInfo.captureDevicePosition.monitor({fireOnInitialValue: true}).take(1).subscribe(({newValue}) => resolve(newValue))
})
