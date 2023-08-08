const mongoose=require("mongoose");
const express=require("express");
const route=express.Router();
const {User,validate}=require("../module/user");
const _=require("lodash");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth");

route.get("/me",auth,async(req,res)=>{
  const user= await User.find({name:req.user.name});
  res.send(user);
});

route.post("/",async (req,res)=>{
   const result=validate(req.body);
   if(result.error) return res.status(400).send(result.error.details[0].message);
   let user=await User.findOne({email:req.body.email});
   if(user) return res.send("email already registered");
   user=new User({
     name:req.body.name,
     email:req.body.email,
     password:req.body.password,
   });
   await user.save();
   const token=jwt.sign(req.body,'secret_key');
   res.header("x-auth-token",token).send(_.pick(user,["id","name","email"]));
});
module.exports=route;