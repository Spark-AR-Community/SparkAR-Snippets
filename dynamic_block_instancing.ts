/**
 * In order to use this snippet in your project you will need to add the following capability to your project:
 * 
 *  + Scripting Dynamic Instantiation 
 * 
 * You do this by going to: 
 *      Menu bar > Project > Edit properties... > Capabilities > (+) Scripting Dynamic Instantiation
 * 
 * If you do no add this capability manually before trying to use or follow this snippet you will get an error/warning
 * 
 * This is a Typescript file -- a file ending with .ts
 * This means it's just Javascript with extra fancy stuff (that is optional)
 * 
 * You can find a project package with the capabilities set up and the code up and running here: https://drive.google.com/file/d/18qA1dSaLObAjHwplEKawvPEKVQ76AH_b/view?usp=sharing
 * 
 * ---
 * 
 * This example was inspired by Ommy (https://www.instagram.com/autonommy/) go follow her
 * Written by Tomas Pietravallo
 */


// Import modules for the Spark Studio APIs
import Scene from 'Scene';
import Blocks from 'Blocks';
import Time from 'Time';
import Diagnostics from 'Diagnostics';
import Reactive from 'Reactive';

// Create an Async function to be able to use Await with promises (which is "easier to use/read")
// Learn more about Async on this blog post by Meta Spark: https://sparkar.facebook.com/ar-studio/learn/tutorials/first-lines-of-code/
async function createAndDestroyBlock() {
    // Make sure you set "block0" to the name of a block within your project's assets
    const myBlock = await Blocks.instantiate("block0", {});

    // Add the block to the Scene root as a child (the Block's parent will be the Scene's focal distance)
    // If you simply instance the block but don't parent it, it will not show on the Scene
    await Scene.root.addChild(myBlock);

    // Create a timer that destroys the block, 500 milliseconds after it was created
    Time.setTimeout(() => {
        // Destroy the block instance
        Scene.destroy(myBlock);

        // Note: you can unparent first by using Scene.root.removeChild, but Scene.destroy unparents automatically
    }, 500);
};

// Create a timer that will execute the code inside every second (1000 milliseconds)
// We'll pass the createAndDestroyBlock as the code to be executed
// If we never called the createAndDestroyBlock the code inside would never run (it'd do nothing)
Time.setInterval(createAndDestroyBlock, 1000 );