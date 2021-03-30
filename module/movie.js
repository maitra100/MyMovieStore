const mongoose=require('mongoose');
const Joi=require("joi");
const {genreschema}=require('./genre');

const movieschema=new mongoose.Schema({
  title:{
      type:String,
      required:true,
      minlength:5,
      maxlength:100,
  },
  genre:genreschema,
  
  numberInStock:{
      type:Number,
      required:true,
      min:5,
      max:100,
  },
   dailyRentalRate:{
      type:Number,
      required:true,
      min:5,
      max:100,
  },
});

const Movies=mongoose.model("Movies",movieschema);

module.exports.Movies=Movies;