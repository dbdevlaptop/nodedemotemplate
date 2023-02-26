const mongoose = require("mongoose");
const conn = require("../config/db")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const SECRETKEY = 'aiousljkdjfjdlljdjdsjlldsjghdsjdjldfjkjklsdjfjkjfkhgjhjhhdldsl';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  password: String,
  tokens:[{
    token:{
      type:String,
      select:require
    }
  }]
},{
    timestamps:true
}); 
//  for password bcript code/ secure code 
userSchema.pre('save',function(next){
  const salt = bcrypt.genSaltSync(10);
  if(this.password && this.isModified('password')){
    this.password = bcrypt.hashSync(this.password, salt);
  console.log(this.password)

  }
  // console.log("out"+this.password)
  next();
})

userSchema.methods.getAuthToken = async function(data){
  let params = {
      id:this._id,
      email:this.email
  }
  var tokenValue = jwt.sign(params, process.env.SECRETKEY,{expiresIn:'300000s'});
  this.tokens = this.tokens.concat({token:tokenValue})
  await this.save();
  return tokenValue;
}

let users = conn.model('users',userSchema)

module.exports = users;
