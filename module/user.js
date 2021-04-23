const Joi = require("joi");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");


const userschema=new mongoose.Schema({
  name:{
      type:String,
      required:true,
      minlength:5,
      maxlength:100,
  },
  email:{
      type:String,
      required:true,
      minlength:5,
      maxlength:100,
      unique:true,
  },
  password:{
      type:String,
      required:true,
      minlength:5,
      maxlength:100,
  }
});

const User=mongoose.model("User",userschema);

userschema.methods.generateauthtoken=function(){
   const token=jwt.sign({id:this.id},"jwtprivatekey");
   return token;
};

function validateuser(user){
 const schema=Joi.object({
     name:Joi.string().min(5).max(100).required(),
     email:Joi.string().min(5).max(100).required().email(),
     password:Joi.string().min(5).max(100).required(),
 });
   return schema.validate({name:user.name,email:user.email,password:user.password});
};

module.exports.User=User;
module.exports.validate=validateuser;