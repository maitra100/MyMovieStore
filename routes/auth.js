const { Router } = require("express");
const Joi=require("joi");
const mongoose=require("mongoose");
const {User}=require("../module/user");
const express=require("express");
const route=express.Router();
const jwt=require("jsonwebtoken");


route.post("/",async (req,res)=>{
  const result=validate(req.body);
  if(result.error) return res.status(400).send("invalid password or email");
  const user=await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("invalid email");
  if(req.body.password===user.password){
  const token=jwt.sign(req.body,'secret_key');
   return res.send(token);
   }
    return res.status(404).send("invalid password");
});

function validate(req){
 const schema=Joi.object({
  email:Joi.string().required().email(),
  password:Joi.string().required(),
 });
 return schema.validate({email:req.email,password:req.password});
};

module.exports=route;