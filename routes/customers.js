const {Customer,validatecustomer}=require("../module/customer.js");
const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const route=express.Router();
const auth = require("../middleware/auth");

route.get("/",auth,async (req,res)=>{
  const customers=await Customer.find().sort({name:1});
  res.send(customers);
});

route.get("/:id",auth,async (req,res)=>{
  const customers=await Customer.findById(req.params.id);
  res.send(customers);
});

route.post("/",auth,async (req,res)=>{
  if(req.user.email!=='soumil@gmail.com'){
    res.send("not Authorized to perform this");
  }
  let customers=new Customer({
     isGold:req.body.isGold,
     name:req.body.name,
     phone:req.body.phone,
  });

  const result=validatecustomer(req.body);
  if(result.error)
  {
      console.log(result.error)
      return res.status(404).send(result.error);
  }
  customers=await customers.save();
  res.send(customers);
});

route.put("/:id",auth,async (req,res)=>{
  if(req.user.email!=='soumil@gmail.com'){
    res.send("not Authorized to perform this");
  }
  let customers=await Customer.findByIdAndUpdate(req.params.id,{
     isGold:req.body.isGold,
     name:req.body.name,
     phone:req.body.phone,
  },{new:true});
  customers=await customers.save() ;
  res.send(customers);
});

route.delete("/:id",auth,async (req,res)=>{
  if(req.user.email!=='soumil@gmail.com'){
    res.send("not Authorized to perform this");
  }
   const customers=await Customer.findByIdAndRemove(req.params.id);
   res.send(customers);
});

module.exports =route;