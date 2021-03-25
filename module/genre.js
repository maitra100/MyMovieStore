const mongoose=require("mongoose");
const Joi = require("joi");

const genreschema=new mongoose.Schema({
 name:{
  type:String,
  required:true,
  minlength:5,
  maxlength:20,
 },
});

const Genre=mongoose.model("Genre",genreschema);

function validategenre(course) {
  const schema = Joi.object({
    name: Joi.required(),
  });
  return schema.validate({name:course});
}

module.exports.Genre=Genre;
module.exports.validategenre=validategenre;
module.exports.genreschema=genreschema;