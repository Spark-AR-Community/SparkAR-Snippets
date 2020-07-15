// Importing module
const s = require("Scene");

//promis start 
Promise.all([
    // Geting the parent
   s.root.findByPath("**/nullObject0/plane0")
 
]).then(result => {
    //can access the child
    let obj = result[0];

});
