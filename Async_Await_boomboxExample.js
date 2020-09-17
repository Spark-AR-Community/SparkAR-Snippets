// How to load in modules
const Animation = require('Animation');
const Scene = require('Scene');
const TouchGestures = require('TouchGestures');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');
export const sceneRoot = Scene.root;

// Enables async/await in JS [part 1]
(async function() {


// To access scene objects
const [base_jnt,speaker_left_jnt,speaker_right_jnt,planeTracker0,placer] = await Promise.all([
    sceneRoot.findFirst('base_jnt'),
    sceneRoot.findFirst('speaker_left_jnt'),
    sceneRoot.findFirst('speaker_right_jnt'),
    sceneRoot.findFirst('planeTracker0'),
    sceneRoot.findFirst('placer')
]);
  
    const baseDriverParameters = {
        durationMilliseconds: 400,
        loopCount: Infinity,
        mirror: true
    };

    const baseDriver = Animation.timeDriver(baseDriverParameters);
    baseDriver.start();

    const baseSampler = Animation.samplers.easeInQuint(0.9, 1);

    const baseAnimation = await Animation.animate(baseDriver,baseSampler);

    const baseTransform = await base_jnt.transform;

    baseTransform.scaleX = await baseAnimation;
    baseTransform.scaleY = await baseAnimation;
    baseTransform.scaleZ = await baseAnimation;
    
    const speakerDriverParameters = {
        durationMilliseconds: 200,
        loopCount: Infinity,
        mirror: true
    };

    const speakerDriver = Animation.timeDriver(speakerDriverParameters);
    speakerDriver.start();

    const speakerSampler = Animation.samplers.easeOutElastic(0.7, 0.85);

    const speakerAnimation = await Animation.animate(speakerDriver,speakerSampler);
    
    const speakerLeftTransform = await speaker_left_jnt.transform;

    speakerLeftTransform.scaleX = await speakerAnimation;
    speakerLeftTransform.scaleY = await speakerAnimation;
    speakerLeftTransform.scaleZ = await speakerAnimation;

    const speakerRightTransform = await speaker_right_jnt.transform;

    speakerRightTransform.scaleX = await speakerAnimation;
    speakerRightTransform.scaleY = await speakerAnimation;
    speakerRightTransform.scaleZ = await speakerAnimation;
    
    TouchGestures.onPan().subscribe(function(gesture) {
        planeTracker0.trackPoint(gesture.location, gesture.state);
    });
    
    const placerTransform = await placer.transform;
    
    TouchGestures.onPinch().subscribeWithSnapshot( {
        'lastScaleX' : placerTransform.scaleX,
        'lastScaleY' : placerTransform.scaleY,
        'lastScaleZ' : placerTransform.scaleZ 
    }, function (gesture, snapshot) {
        placerTransform.scaleX = gesture.scale.mul(snapshot.lastScaleX);
        placerTransform.scaleY = gesture.scale.mul(snapshot.lastScaleY);
        placerTransform.scaleZ = gesture.scale.mul(snapshot.lastScaleZ);
    });
    
    TouchGestures.onRotate().subscribeWithSnapshot( {
        'lastRotationY' : placerTransform.rotationY,
    }, function (gesture, snapshot) {
        const correctRotation = gesture.rotation.mul(-1);
        placerTransform.rotationY = correctRotation.add(snapshot.lastRotationY);
    });

// To log messages to the console
Diagnostics.log('success.');

// Enables async/await in JS [part 2]
})();

 

  

