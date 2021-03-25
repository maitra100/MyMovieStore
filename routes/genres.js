const {Genre,validategenre}=require("../module/genre.js")
const mongoose=require("mongoose");
const express=require('express');
const route=express.Router();
const Joi = require("joi");
//const auth=require("../middleware/auth");

route.get("/", async (req, res) => {
  const genre=await Genre.find().sort({name:1}); 
  res.send(genre);
});

route.get("/:id", async (req, res) => {
  const gen = await Genre.findbyId(req.params.id);
  if (!gen) return res.status(404).send("genre with the given id not found");
  res.send(gen);
});

route.post("/",auth, async (req, res) => {
  
  let gen = new Genre({
    name: req.body.name,
  });
  const result = validategenre(gen.name);
  if (result.error) {
    console.log(result.error);
    res.status(400).send("bad request");
    return;
  }
  gen=await gen.save();
  res.send(gen);
});

route.put("/:id",async (req,res)=>{
  const gen=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
  
  if (!gen) return res.status(404).send("genre with the given id not found");

  res.send(gen);
});

route.delete("/:id",async (req,res)=>{
  const gen=await Genre.findByIdAndRemove(req.params.id);
  
  if (!gen) return res.status(404).send("genre with the given id not found");

  res.send(gen);
});

module.exports=route;