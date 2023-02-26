const express = require("express");
const app = express();
const port = 8000;
const userRoute = require("./routes/users");
var bodyParser = require('body-parser');
const passport = require('passport');

const path = require('path');
require('dotenv').config({
    path: path.join(__dirname,'.env')
})

app.use(passport.initialize());



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());




app.use("/user", userRoute); 

app.listen(port,()=>{
    console.log(`App is listening at http://${process.env.HOST}:${process.env.PORT}`)
})