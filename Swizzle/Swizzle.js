const Reactive = require('Reactive');

/**
 * Take input numbers and output them in a different order. 
 * Input values correspond to the swizzle value (xyzw) in the order theyre inputted. For example, an input of (1,2,3) and a swizzle value of (yxz) would output (2,1,3). You can also use 0 and 1. For example, a swizzle value of (x01) would output (1,0,1). 
 * @param {*} value A number or vector that you want to reorder. 
 * @param {string} specifier The order to output the values. Use (xyzw) and (01).
 * @returns {*} The values in your chosen order.
 */
export function swizzle(value, specifier) {
    const signal = element => {
        const swizzleSignal = property => {
            if (typeof (value) == 'number') {
                if (property == 'x' || property == 'r') {
                    return value;
                } else {
                    throw `Specifier '${property}' in '${specifier}' can't be used with this signal.`;
                }
            } else if (value['pinLastValue'] != undefined) {
                if (property == 'x' || property == 'r') {
                    return value;
                } else {
                    throw `Specifier '${property}' in '${specifier}' can't be used with this signal.`;
                }
            } else {
                if (value[property] == undefined) {
                    throw `Specifier '${property}' in '${specifier}' can't be used with this signal.`;
                } else {
                    return value[property];
                }
            }
        }

        switch (element) {
            case '0': return 0;
            case '1': return 1;
            case 'x': return swizzleSignal('x');
            case 'y': return swizzleSignal('y');
            case 'z': return swizzleSignal('z');
            case 'w': return swizzleSignal('w');
            case 'r': return swizzleSignal('x');
            case 'g': return swizzleSignal('y');
            case 'b': return swizzleSignal('z');
            case 'a': return swizzleSignal('w');
            default: throw `Invalid swizzle element specifier: '${element}' in '${specifier}'`;
        }
    }

    switch (specifier.length) {
        case 1: return signal(specifier[0]);
        case 2: return Reactive.pack2(signal(specifier[0]), signal(specifier[1]));
        case 3: return Reactive.pack3(signal(specifier[0]), signal(specifier[1]), signal(specifier[2]));
        case 4: return Reactive.pack4(signal(specifier[0]), signal(specifier[1]), signal(specifier[2]), signal(specifier[3]));
        default: throw `Invalid swizzle specifier: '${specifier}'`;
    }
}

/**
 * Convert Point4DSignal to RGBASignal.
 * @param {Point4DSignal} point4D 
 */
export function vec4_toRGBA(point4D) {
    return Reactive.RGBA(point4D.x, point4D.y, point4D.z, point4D.w);
}

/**
 * Convert Point4DSignal to HSVASignal.
 * @param {Point4DSignal} point4D 
 */
export function vec4_toHSVA(point4D) {
    return Reactive.HSVA(point4D.x, point4D.y, point4D.z, point4D.w);
}