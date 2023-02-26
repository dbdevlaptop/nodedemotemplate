var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var Users = require('../models/users');

module.exports = function(passport){
    let params = {};
    params.secretOrKey = process.env.SECRETKEY || 'aiousljkdjfjdlljdjdsjlldsjghdsjdjldfjkjklsdjfjkjfkhgjhjhhdldsl';
    params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    passport.use(
        new JWTStrategy(params,function(jwt_payload, next){
            let emailID = jwt_payload.email
            Users.findOne({email:emailID},function(err,user){
                if(err){
                    return next(err, false);
                }
                if (user) {
                    return next(null, user);
                } else {
                    return next(null, false);
                    // or you could create a new account
                }
            });
        })
    )
}