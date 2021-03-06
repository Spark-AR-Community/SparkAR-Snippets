// Made by Tomás Pietravallo for Diego Aguirre & The Spark AR Community

// IMPORTANT 👇
// This file is TYPESCRIPT, *NOT JAVASCRIPT*.
// You need to create/use Typescript (.ts) files in Spark AR Studio for it to work

// Import modules
import Patches from 'Patches';
// Import Typescript types
import { BoolSignal } from 'ReactiveModule';

(async function () {
    // `await` is used to resolve the getBoolean() promise
    // `: BoolSignal` is used to denote the type of the variable, this will provide you with intellisense in VSCode
    const input1: BoolSignal = await Patches.outputs.getBoolean('InputBool1');
    const input2: BoolSignal = await Patches.outputs.getBoolean('InputBool2');

    // `or()` is the Reactive funtion for the boolean operator OR (commonly denoted with || )
    // `onOn()` creates an event every time the OR operation switches from false -> true.
    // `Patches.inputs.setPulse()` returns a pulse to the patch editor
    Patches.inputs.setPulse('OutputPulse1', input1.or(input2).onOn());

    /** 
     * Note that both the From Script & To Script patches need to be placed in the editor.
     * Drag & drop the script to the editor to place the From Script variables (only needs to be done once).
     * Click on the yellow arrow for every 'To Script' variable.
     * 
     * Make sure the types of the variables you create have the same type you provide as the input/output of the code.
     * Variable names are case sensitive.
     * 
     * To create Patch Bridge variables, select any Javascript or Typescript files and head to the inspector panel.
     * Learn more about Patch Bridge variables here: https://sparkar.facebook.com/ar-studio/learn/patch-editor/bridging
    */
})();