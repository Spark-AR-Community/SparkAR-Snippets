# Swizzle

**Swizzle** is an equivalent of [Swizzle Patch](https://sparkar.facebook.com/ar-studio/learn/patch-editor/utility-patches/) in script.



## Install

0. [Download Swizzle](https://raw.githubusercontent.com/Spark-AR-Community/SparkAR-Snippets/master/Swizzle/Swizzle.js) (Right click and Save as).

1. Drag/Drop or import `Swizzle.js` to Spark AR.

2. Import `siwzzle` function.

    ```javascript
    import { swizzle } from './Swizzle';
    ```

3. You can also [Click Here to Download Sample Project (v98)](https://raw.githubusercontent.com/Spark-AR-Community/SparkAR-Snippets/master/Swizzle/SwizzleDemo.arprojpkg).



## Usage

```javascript
import { swizzle } from './Swizzle';

const Reactive = require('Reactive');

swizzle(Reactive.val(.1), 'xxx1')
// Reactive.pack4(.1, .1, .1, 1)

swizzle(Reactive.pack2(.1, .3), 'yx')
// Reactive.pack2(.3, .1)

swizzle(Reactive.pack3(.1, .3, .5), 'xzz0')
// Reactive.pack4(.1 , .5, .5, 0)

swizzle(Reactive.pack4(.1, .3, .5, .7), '0101')
// Reactive.pack4(0, 1, 0, 1)

swizzle(Reactive.vector(.1, .3, .5), 'z')
// Reactive.val(.5)

swizzle(Reactive.RGBA(.3, .8, .6, 1).toVec4(), 'bgr1')
// Reactive.pack4(.6, .8, .3, 1)

swizzle(Reactive.HSVA(.2, .8, .6, 1).toVec4(), 'rrxz')
// Reactive.pack4(.2, .2, .2, .6)
```



### swizzle(value, specifier)

Take input numbers and output them in a different order.

- `value`: A number or vector that you want to reorder.
- `specifier`: The order to output the values. Use (xyzw) and (01).

### vec4_toRGBA(point4D)

Convert Point4DSignal to RGBASignal.

### vec4_toHSVA(point4D)

Convert Point4DSignal to HSVASignal.