// Using Node.js `require()`
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://localhost:27017/learnerp`)
.then(() => console.log('DB Connected!'))
.catch((err)=>{
    console.log("error "+ err)
})

module.exports = mongoose;