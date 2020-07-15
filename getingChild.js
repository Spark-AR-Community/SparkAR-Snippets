// Importing module
const s = require("Scene");

//promis start 
Promise.all([
    // Geting the parent
    s.root.findFirst("object1").then(p => {
        //geting the child
        return p.findFirst("object2");
    }),
]).then(result => {
    //can access the child
    let obj = result[0];

});
