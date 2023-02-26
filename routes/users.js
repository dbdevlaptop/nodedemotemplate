const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
var jwt = require('jsonwebtoken');

var passport = require('passport');
require('../config/passport')(passport);

// var jwtAuth = (req,res,next) =>{
//     var token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({message: "Not authorized"});
//     }
//     else{
//         token = token.split(' ')[1];
//         jwt.verify(token,process.env.SECRETKEY, function(err,decoded){
//             if(err){
//                 res.send({'message':'invalid Token'})
//             }
//             else{
//                 next();
//             }
//         })
//     }
    
// }


router.get("/",(req,res)=>{
    res.send("Hello Devs ");
})

router.get("/list",passport.authenticate('jwt',{session:false}),userCtrl.userList);

router.post("/add",userCtrl.userAdd);

router.post("/login",userCtrl.userLogin);


module.exports = router;