const mongoose=require("mongoose");
const express=require("express");
const route=express.Router();
const {Movies}=require("../module/movie.js");
const { Genre } = require("../module/genre.js");

route.get("/",async (req,res)=>{
  const movies=await Movies.find();
  res.send(movies);
  console.log(movies);
});

route.get("/:id",async (req,res)=>{
  const movies=await Movies.findById(req.params.id);
  res.send(movies);
  console.log(movies);
});

route.post("/",async (req,res)=>{
    const genre=await Genre.findById(req.body.GenreId);
  let movie=new Movies({
     title:req.body.title,
     genre:{
         id:genre.id,
         name:genre.name,
     },
     numberInStock:req.body.numberInStock,
     dailyRentalRate:req.params.dailyRentalRate,
  });
  movie=await movie.save();
  res.send(movie);
});

route.put('/:id', async (req, res) => {
  /*const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);*/

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movies.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  res.send(movie);
});

route.delete('/:id', async (req, res) => {
  const movie = await Movies.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

